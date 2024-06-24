
# Star Wars API 🌌

This project is a NestJS-based RESTful API for managing Star Wars characters. It includes all CRUD (Create, Read, Update, Delete) operations with proper validation, pagination, and unit/integration tests.

## Prerequisites 📋

- Node.js (>= 14.x) 🟢
- pnpm (>= 6.x) 📦

## Installation 💻

1. Clone the repository:

   ```bash
   git clone https://github.com/wojtekkrol/star-wars-api.git
   cd star-wars-api
   ```

2. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

## Running the Application 🚀

1. Start the development server:

   ```bash
   pnpm run start:dev
   ```

   The API will be available at `http://localhost:3000/api`.

## API Documentation 📄

Swagger is used for API documentation. Once the application is running, you can access the documentation at:

```
http://localhost:3000/api
```

## Running Tests 🧪

The project includes both unit and integration tests. To run the tests, use the following command:

```bash
pnpm run test
```

## Project Structure 🗂️

```
src/
├── app.module.ts
├── main.ts
├── star-wars/
│   ├── DTOs/
│   │   ├── create-character.dto.ts
│   │   ├── update-character.dto.ts
│   ├── interfaces/
│   │   └── star-wars-character.interface.ts
│   ├── star-wars.controller.spec.ts
│   ├── star-wars.controller.ts
│   ├── star-wars.module.ts
│   ├── star-wars.service.spec.ts
│   └── star-wars.service.ts
```

## Key Features ✨

- **CRUD Operations**: Create, Read, Update, Delete Star Wars characters.
- **Validation**: Uses Zod for input validation.
- **Pagination**: Supports pagination for listing characters.
- **Testing**: Comprehensive unit and integration tests.
- **API Documentation**: Swagger for API documentation.

## Example Data Structure 📊

```json
{
  "characters": [
    {
      "name": "Luke Skywalker",
      "episodes": ["NEWHOPE", "EMPIRE", "JEDI"]
    },
    {
      "name": "Darth Vader",
      "episodes": ["NEWHOPE", "EMPIRE", "JEDI"]
    },
    {
      "name": "Han Solo",
      "episodes": ["NEWHOPE", "EMPIRE", "JEDI"]
    },
    {
      "name": "Leia Organa",
      "episodes": ["NEWHOPE", "EMPIRE", "JEDI"],
      "planet": "Alderaan"
    },
    {
      "name": "Wilhuff Tarkin",
      "episodes": ["NEWHOPE"]
    },
    {
      "name": "C-3PO",
      "episodes": ["NEWHOPE", "EMPIRE", "JEDI"]
    },
    {
      "name": "R2-D2",
      "episodes": ["NEWHOPE", "EMPIRE", "JEDI"]
    }
  ]
}
```

## Note ⚠️

This project currently does not use any database. All data is stored in memory, which means that it will be lost when the application is restarted. Adding a database to persist the data would be a smart enhancement. You could use databases like MongoDB, PostgreSQL, or any other preferred database.

## License 📄

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing 🤝

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact 📧

For any inquiries, please contact [wojciechkrol97@gmail.com].
