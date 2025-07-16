import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

export const Category = ({ category, onEdit, onDelete }) => {
  const { name } = category;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center gap-2 p-4">
        {onEdit != null && onDelete != null ? (
          <>
            <Button
              onClick={() => onEdit(category)}
              variant="default"
              size="sm"
            >
              Editar
            </Button>
            <Button
              onClick={() => onDelete(category)}
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
