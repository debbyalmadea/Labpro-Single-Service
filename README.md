# Labpro Single Service
Single Service Application developer in Express.js to fullfil Labpro phase 3 selection. The repo for monolith application can be accessed [here](https://github.com/debbyalmadea/Labpro-Monolith)

> This project is developed in MacOS environment

## Author

Made Debby Almadea Putri
13521153

## How to Run

### Prerequisite
1. node v19
2. docker v20
3. psql v14

### Step by step
1. Clone the project repository from GitHub using the following command:
```
git clone https://github.com/debbyalmadea/Labpro-Single-Service.git
cd Labpro-Single-Service
```
2. Rename `.env.example` file to `.env`. Feel free to change the value according to your sytem preferences
3. Run the container using `docker-compose up -d`
4. The base path for the API is `<domain>/api/v1`

### Migrating and seeding the database
1. Open the CLI for the container using the following command:
   ```
   docker ps
   docker exec -it <container-id> sh
   ```
   or
   ```
   docker exec -it <names> sh
   ```
2. Run the migration and seeding by `bash start.sh`
3. Use the following username and password as admin
   ```
   username: debbyalmadea
   password: this_is_a_password!
   ```

### Additional Notes
- If you want to run the server in development mode with auto-reloading on code changes, you can use the following command:
   ```
    npm run dev
   ```
- If you got prisma error try running the following command
   ```
    npx prisma generate
    npx prisma migrate dev --name init
   ```
- If you got postgresql connection error, check your postgresql database and change the `.env` file to match your postgresql settings
- The app only whitelisted the following domain
   ```
   http://127.0.0.1:8000
   http://localhost:5173
   https://ohl-fe.vercel.app
  ```

## Design Pattern
1. Chain of Responsibility
   This pattern is implemented in `src/utils/ErrorHandler.ts` for error handling mechanism where different error are handled appropriately based on their type, and a default error response is provided if no handler in the chain can handle a specific error. By using the Chain of Responsibility pattern, we can easily add or remove new error handlers without modifying the existing code. It also allows us to have a clear separation of concerns for different types of errors and their corresponding responses.

   This pattern also implemented in express middleware system where we provide some handlers (functions) to handle a request. Each middleware function (in this case `authenticateToken` and `validate`) will processes a request, performs specific tasks, and passes control to the next middleware or the final route handler using next(). This chainable pattern allow us to separate responsibility to different handlers making the code cleaner and each function have a more defined responsibility.
2. Builder
   This pattern is implemented in `src/utils/JsonResponse.ts` to construct JSON responses with optional properties. The `JsonResponse` class represents the complex object that we want to construct, which is a JSON response to be sent in an Express response. The `JsonResponseBuilder` acts as the builder for the JsonResponse object and call `make()` method when we're done building. By using this pattern, we can add more properties or configuration options to the JsonResponse class in the future without affecting the existing codebase and without making the class constructor overly complex.
3. Facade
    This pattern is implemented in `src/utils/ErrorHandler.ts` for simplifying error handling mechanism. Although the main error handler classes are implemented using COR pattern, it's also combined with Facade Pattern. The exported instance of the error handler, which is the chained combination of different error handlers, acts as a simplified interface for handling errors in the Express application. Even though it's not implemented in a traditional way, it still provide a concept of hiding complex error handling from the client.
4. Decorator/Wrapper
   This pattern is implemented in `src/utils/tryCatchWrapper.ts`. TryCatchWrapper is a decorator function that wraps the request handler with a try catch error handling. Although it isn't the traditional way to implement decorator/wrapper pattern, it still presents the concept of wrapping functionality around an existing component. The wrapper function helps creating a clean and consistent way of handling errors in Express route handlers, reducing duplicated code by avoiding handling error in every request handler (controller).

## Tech Stack
- Node.js v19.9.0
- prisma v4.16.2
- express v4.18.2
- jest v29.6.1
- typescript v5.1.6
- zod v3.21.4

## Endpoint
> Note ALL here means the whitelisted domain only
1. `GET \`: check if server is running [ALL]
2. `POST \login`: login to the system as admin and get the access token [ALL]
3. `GET \self`: get self data (username and name) [ADMIN]
4. `GET \barang`: get all barang data [ALL]
5. `GET \barang\{id}`: get barang data by id [ALL]
6. `POST \barang`: create a new barang [ADMIN]
7. `PUT \barang\{id}`: update barang [ADMIN]
8. `DELETE \barang\{id}`: delete barang [ADMIN]
9. `PATCH \barang\{id}\stok\decrease`: decrease barang's stock (stok) [ALL]
10. `GET \perusahaan`: get all perusahaan data [ALL]
11. `GET \perusahaan\{id}`: get perusahaan data by id [ALL]
12. `POST \perusahaan`: create a new perusahaan [ADMIN]
13. `PUT \perusahaan\{id}`: update perusahaan [ADMIN]
14. `DELETE \perusahaan`: delete perusahaan [ADMIN]

## BONUS

### API Documentation using Swagger

API Documentation can be accessed [here](https://app.swaggerhub.com/apis-docs/ALMADEAPUTRI/labpro-single-service/1.0.0)

### Automated Testing using Jest

- The test scripts can be seen inside `tests` folder. The tests cover 100% of Service Layer where the business logic lays
- To run the test scripts, run the following command
  ```
  npm test
  ```

### SOLID Application
1. Single Responsibility
   This app use MVC + Services architecture, although there's no views as it is an backend application. However, by using this architecture, we're adhering to the Single Responsibility principle where the Controller classes are responsible for parsing the request, call the relevant service(s) to perform the required operations, and then format and send the response. Service classes are responsible for handling complex business logic and provide an abstraction layer between the controller and the database.
2. Open-Closed Principle
   The implementation of `ErrorHandler` adheres to the Open-Closed Principle because the error handler is designed to be easily extended with new error handlers. Each error handler is represented as a separate class (HttpErrorHandler, ZodErrorHandler, PrismaClientKnownRequestErrorHandler) that extends the abstract ErrorHandler class. When adding new error handlers, the existing error handler classes do not need to be modified and new error handler can be added to the chain without modifying the existing error handler classes.
3. Liskov Substitution Principle
   The implementation of subclasses of `ErrorHandler` and also `HttpError` adheres to the Liskov Substitution Principle. The subclasses (HttpErrorHandler, ZodErrorHandler, PrismaClientKnownRequestErrorHandler) are replacing their superclass (ErrorHandler) in the chain of responsibility. All subclasses adhere to the same interface defined by the ErrorHandler superclass. The subclass HttpError can be used interchangeably with instances of the Error class since it inherits all the properties and methods of the Error class. 
4. Interface Segregation Principle
   This app also adhere to ISP because every interface has methods that the clients need and no class that implements an interface needs to throw `UnsupportedOperationException` or `NotImplementedException`
5. Dependency Inversion Principle
   The Controllers and Services layers only relying on abstractions instead of concrete implementations. The construction and dependency injection are done in the routes (app) layers. This promotes decoupling and flexibility in your application. If there's any changes in the future for the Services or Models layer we don't need to change other layer that depends on it.