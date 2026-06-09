import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UpdaterService } from '../updater/updater.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly updaterService: UpdaterService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // If it's a 500 error, we log it and push it to Central Hub
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`Critical Error on ${request.url}`, exception);
      
      // Fire and forget error syncing
      this.updaterService.reportErrorToHub(exception).catch(err => {
        this.logger.error('Failed to report error to hub', err);
      });
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
