import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'planner'
    })

    // Find user by email
    const [users] = await connection.execute(
      'SELECT id, email, password FROM users WHERE email = ?',
      [email.trim().toLowerCase()]
    )

    await connection.end()

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const user = users[0] as any
    
    // Direct comparison (since passwords are not hashed)
    if (password !== user.password) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: true, userId: user.id },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Signin error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Signin failed' },
      { status: 500 }
    )
  }
}