import React from "react";
import { useParams } from "react-router-dom";

export default function CoursePage() {
  const { coursename } = useParams();
  return <div>{coursename}</div>;
}
