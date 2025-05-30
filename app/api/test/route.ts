import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'working',
    message: 'API работает нормально',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'working',
    message: 'POST запрос работает',
    timestamp: new Date().toISOString()
  })
} 