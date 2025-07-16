# Product Manager - MongoDB CRUD Client

A modern React TypeScript application for managing products with full CRUD operations, built with Vite and Tailwind CSS.

## Features

- ✨ **Full CRUD Operations**: Create, Read, Update, and Delete products
- 🔍 **Advanced Search & Filtering**: Search by name/description and filter by category
- 📊 **Sorting**: Sort products by name, price, stock, or creation date
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Responsive**: Works perfectly on all device sizes
- ⚡ **Fast Performance**: Built with Vite for optimal development experience
- 🔒 **Type Safety**: Full TypeScript support for better development experience

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Hooks

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB backend API (see API Documentation below)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd client-ci-cd
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Documentation

The application expects a RESTful API with the following endpoints:

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### GET /products

Get all products

```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": number,
      "category": "string",
      "stock": number,
      "imageUrl": "string (optional)",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

#### GET /products/:id

Get a specific product by ID

```json
{
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "description": "string",
    "price": number,
    "category": "string",
    "stock": number,
    "imageUrl": "string (optional)",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### POST /products

Create a new product

```json
{
  "name": "string (required)",
  "description": "string (required)",
  "price": "number (required, > 0)",
  "category": "string (required)",
  "stock": "number (required, >= 0)",
  "imageUrl": "string (optional)"
}
```

#### PUT /products/:id

Update an existing product

```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "price": "number (optional, > 0)",
  "category": "string (optional)",
  "stock": "number (optional, >= 0)",
  "imageUrl": "string (optional)"
}
```

#### DELETE /products/:id

Delete a product

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

#### GET /products/category/:category

Get products by category

```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": number,
      "category": "string",
      "stock": number,
      "imageUrl": "string (optional)",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

#### GET /products/search?q=query

Search products by name or description

```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": number,
      "category": "string",
      "stock": number,
      "imageUrl": "string (optional)",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ProductCard.tsx     # Individual product display
│   ├── ProductForm.tsx     # Create/Edit product form
│   └── ProductList.tsx     # Product grid with search/filter
├── services/           # API services
│   ├── api.ts             # Axios configuration
│   └── productService.ts  # Product CRUD operations
├── types/              # TypeScript type definitions
│   └── Product.ts         # Product interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles (Tailwind CSS)
```

## Features in Detail

### Product Management

- **Create Products**: Add new products with validation
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products with confirmation
- **View Products**: Browse all products in a responsive grid

### Search & Filter

- **Text Search**: Search by product name or description
- **Category Filter**: Filter products by category
- **Sorting**: Sort by name, price, stock, or creation date
- **Real-time Results**: Instant filtering and search results

### User Experience

- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Data Validation

- **Form Validation**: Client-side validation for all fields
- **Required Fields**: Name, description, price, category, and stock
- **Price Validation**: Must be greater than 0
- **Stock Validation**: Must be non-negative

## Environment Variables

| Variable       | Description          | Default                     |
| -------------- | -------------------- | --------------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## Development

### Adding New Features

1. Create new components in `src/components/`
2. Add TypeScript interfaces in `src/types/`
3. Implement API services in `src/services/`
4. Update the main App component as needed

### Styling

- Uses Tailwind CSS for styling
- Custom CSS classes in `src/index.css`
- Responsive design with mobile-first approach

### TypeScript

- Strict type checking enabled
- All components are properly typed
- API responses are typed with interfaces

## Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Static Hosting

The built files in `dist/` can be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
