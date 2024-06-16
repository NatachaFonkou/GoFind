import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { MongooseError } from "mongoose"; // I couldn't see the error class is being exported from Mongoose

@Catch(MongooseError)
export class MongoExceptionsFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    let error;

    console.log(exception);

    switch (exception.name) {
      case "DocumentNotFoundError": {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Not Found",
        };
        break;
      }
      case "CastError": {
        error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Mongoose Cast Error",
        };
        break;
      }
      case "DisconnectedError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Mongoose disconnected",
        };
        break;
      }
      case "DivergentArrayError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Mongoose DivergentArrayError",
        };
        break;
      }
      case "MissingSchemaError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Mongoose MissingSchemaError",
        };
        break;
      }
      case "ValidationError": {
        error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Mongoose Validation Error",
        };
        break;
      }
      case "ObjectExpectedError": {
        error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Mongoose ObjectExpectedError",
        };
        break;
      }
      case "ObjectParameterError": {
        error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Mongoose ObjectParameterError",
        };
        break;
      }
      case "OverwriteModelError": {
        error = {
          statusCode: HttpStatus.CONFLICT,
          message: "Mongoose OverwriteModelError",
        };
        break;
      }
      case "ParallelSaveError": {
        error = {
          statusCode: HttpStatus.CONFLICT,
          message: "Mongoose ParallelSaveError",
        };
        break;
      }
      case "StrictModeError": {
        error = {
          statusCode: HttpStatus.FORBIDDEN,
          message: "Mongoose StrictModeError",
        };
        break;
      }
      case "VersionError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Mongoose VersionError",
        };
        break;
      }
      case "MongooseError": {
        error = {
          statusCode: HttpStatus.FAILED_DEPENDENCY,
          message: "MongooseError",
        };
        break;
      }
      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal Error",
        };
        break;
      }
    }

    response.status(error.statusCode).json(error);
  }
}
