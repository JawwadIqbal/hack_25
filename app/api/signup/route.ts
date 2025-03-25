import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function POST(request: Request) {
  try {
    // Get form data from request
    const { firstName, lastName, email, password } = await request.json()

    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'planner'
    })

    // Insert user into database
    const [result] = await connection.execute(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, password] // In production, you should hash the password first
    )

    await connection.end()

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Signup failed' },
      { status: 500 }
    )
  }
}