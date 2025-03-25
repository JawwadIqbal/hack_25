import { NextResponse } from "next/server"
import mysql from 'mysql2/promise'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // 1. Store in MySQL (existing code)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'planner'
    })

    const [result] = await connection.execute(
      'INSERT INTO responses (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    )
    await connection.end()

    // 2. Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // Where you want to receive feedback
      subject: 'New Feedback Submission',
      html: `
        <h3>New Feedback Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process feedback' },
      { status: 500 }
    )
  }
}