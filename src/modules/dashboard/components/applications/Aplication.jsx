import React from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

export const Aplication = ({ application, onEdit, onDelete }) => {
  const { name } = application;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center gap-2 p-4">
        {onEdit != null && onDelete != null ? (
          <>
            <Button onClick={() => onEdit(application)}>Editar</Button>
            <Button onClick={() => onDelete(application)}>Eliminar</Button>
          </>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  );
};
