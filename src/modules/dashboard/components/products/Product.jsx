import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

export const Product = ({ product, onEdit, onDelete }) => {
  const { name, description, imageUrl, pdfUrl } = product;
  console.log({ pdfUrl });
  return (
    <Card className="h-full flex flex-col p-2">
      <CardTitle>{name}</CardTitle>
      <CardContent className=" flex-1">
        <p className="text-gray-600 text-sm">{description}</p>
        {imageUrl && imageUrl !== "" ? (
          <img
            className="w-48 h-48 object-cover rounded-lg bg-center"
            src={imageUrl}
            alt={name}
          />
        ) : (
          <></>
        )}
        {pdfUrl && pdfUrl !== "" && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-3 w-full"
          >
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              Ver PDF
            </a>
          </Button>
        )}
      </CardContent>

      <CardFooter className="flex justify-center gap-2 p-4">
        {onEdit != null && onDelete != null ? (
          <>
            <Button onClick={() => onEdit(product)} variant="default" size="sm">
              Editar
            </Button>
            <Button
              onClick={() => onDelete(product)}
              variant="destructive"
              size="sm"
            >
              Borrar
            </Button>
          </>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  );
};
