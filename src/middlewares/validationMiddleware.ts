import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      console.log(error);
      res
        .status(422)
        .send(error.details.map((e: { message: String }) => e.message));
    }
  };
}

export async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).send("Unauthorized");
  try {
    if (typeof apiKey !== "string") return res.status(401).send("Unauthorized");

    const company = await findByApiKey(apiKey);
    if (!company) {
      return res.status(401).send("Unauthorized");
    }
    res.locals.company = company;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function validateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { employeeId } = req.body;
  try {
    const employee = await findById(employeeId);
    if (employee.length === 0) {
      return res.status(401).send("Unauthorized");
    }
    if (employee.companyId !== res.locals.company.id) {
      return res.status(401).send("Unauthorized");
    }
    res.locals.employee = employee;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
