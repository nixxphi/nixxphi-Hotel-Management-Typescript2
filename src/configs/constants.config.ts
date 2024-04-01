import express, { Request, Response } from 'express'; 
// Interface for the response object
interface ErrorResponse {
    success: boolean;
    message: string;
  }
  
  // Function for handling Page Not Found errors 
  export default function PAGENOTFOUND(req: Request, res: Response): void {
    const errorResponse: ErrorResponse = {
      success: false,
      message: "You're looking for a resource that does not exist",
    };
  
    res.json(errorResponse); 
  }
  