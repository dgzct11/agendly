'use client'
import Results from "@/app/content/components/Results"
import Navbar from "../content/components/Navbar";
import Loading from "../results/loading";
import { useState } from "react";

const ResultsPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    
      if (isLoading) {
        return <Loading />; // Render the Loading component while data is being loaded
      }
    
    return( <><Navbar /><Results /></> );

};

export default ResultsPage;