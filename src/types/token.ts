export interface TokenPayload {
  email: string;
  password: string;
  role?: "driver" | "renter"; // Add role if needed
}