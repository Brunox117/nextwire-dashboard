import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

export const Product = ({ product, onEdit, onDelete }) => {
  const { name, description } = product;
  return (
    <Card className="h-full flex flex-col p-2">
      <CardTitle>{name}</CardTitle>
      <CardContent className=" flex-1">
        <p className="text-gray-600 text-sm">{description}</p>
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
