import { NextResponse } from "next/server";
export async function GET(req, res) {
   const countries = [
      { name: "USA" },
      { name: "Canada" },
      { name: "Mexico" },
      // Add more countries as needed
   ];
   return NextResponse.json(countries);
}
