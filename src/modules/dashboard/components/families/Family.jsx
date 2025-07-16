import React from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

export const Family = ({ family, onEdit, onDelete }) => {
  const { name } = family;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center gap-2 p-4">
        {onEdit != null && onDelete != null ? (
          <>
            <Button variant="default" size="sm" onClick={() => onEdit(family)}>
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(family)}
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
