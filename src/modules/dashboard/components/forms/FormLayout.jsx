import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

export const FormLayout = ({
  title = "",
  children,
  onSave,
  onCreate,
  onDelete,
  onCancel,
  isSaving,
  isFormValid,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button
          onClick={onSave}
          disabled={isSaving || !isFormValid}
          variant="default"
        >
          Guardar
        </Button>
        <Button onClick={onCreate} disabled={isSaving} variant="outline">
          Crear
        </Button>
        <Button onClick={onDelete} disabled={isSaving} variant="destructive">
          Eliminar
        </Button>
        <Button onClick={onCancel} disabled={isSaving} variant="outline">
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  );
};
