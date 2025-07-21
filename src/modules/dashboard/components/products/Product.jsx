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
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline mt-2 block"
          >
            Ver pdf
          </a>
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
