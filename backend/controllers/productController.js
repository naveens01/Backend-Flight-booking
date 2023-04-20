import asyncHandler from 'express-async-handler'
// import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
  ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
  : {}

  const count = await Book.countDocuments({ ...keyword })

const books = await Book.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ books, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    res.json(book)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    await book.remove()
    res.json({ message: 'Ticket removed' })
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const book = new Book({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: 'E:\Projects\stunning-sprak\frontend\public\images\sample-image.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdBook = await book.save()
  res.status(201).json(createdBook)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const book = await Book.findById(req.params.id)

  if (book) {
    book.name = name
    book.age = age
    book.count = count
    book.from_place = from_place
    book.to_place= to_place
    book.amount = amount

    const updatedBook = await book.save()
    res.json(updatedBook)
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createBookReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const Book = await Book.findById(req.params.id)

  if (book) {
    const alreadyReviewed = book.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Ticket already viewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    book.reviews.push(review)

    book.numReviews = book.reviews.length

    book.rating =
      book.reviews.reduce((acc, item) => item.rating + acc, 0) /
      book.reviews.length

    await book.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
// const getTopProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({}).sort({ rating: -1 }).limit(3)

//   res.json(products)
// })

export {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  //getTopProducts,
}