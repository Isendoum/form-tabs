import { NextResponse } from "next/server";
export async function GET(req, res) {
   const countries = [
      { id: 1, name: "USA" },
      { id: 2, name: "Canada" },
      { id: 3, name: "Mexico" },
      // Add more countries as needed
   ];
   return NextResponse.json({ options: countries });
}
