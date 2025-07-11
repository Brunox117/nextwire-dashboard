import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

export const CreateBox = ({ title = "", onClick }) => {
  return (
    <>
      <br />
      <div className="flex flex-col items-center justify-center">
        {/* TODO el card deberia tener un width maximo pero no un minimo */}
        <Card className="mx-auto w-[350px] max-w-3xl" onClick={onClick}>
          <CardHeader className="text-center py-8">
            <div className="flex flex-col items-center space-y-3">
              <CardTitle className="text-lg font-semibold text-gray-800">
                {title}
              </CardTitle>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold hover:bg-blue-600 transition-colors duration-200">
                +
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};
