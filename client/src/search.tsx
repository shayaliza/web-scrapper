import React, { useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [scrapedData, setScrapedData] = useState<any>(null);

  const fetchScrapeData = async (url: string) => {
    const { data } = await axios.post("http://localhost:5000/scrape", { url });
    setScrapedData(data);
    return data;
  };

  const mutation = useMutation({
    mutationFn: fetchScrapeData,
    onSuccess: (data) => {
      console.log("Scraping result:", data);
      setIsDialogOpen(true);
    },
    onError: (error) => {
      console.error("Error scraping:", error);
      toast({
        description: "Error scraping. Please try again.",
      });
    },
  });

  const handleSubmit = () => {
    const url = inputRef.current?.value;
    if (!url) {
      toast({
        description: "Please Enter Website URL",
      });
      return;
    }
    mutation.mutate(url);
  };

  const handleDownloadJSON = () => {
    if (!scrapedData) return;
    const jsonData = JSON.stringify(scrapedData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "scraped_data.json";
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsDialogOpen(false);
  };

  const SuccessDialog = () => {
    return (
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Scraping Successful</AlertDialogTitle>
            <AlertDialogDescription>
              The website was scraped successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="mb-10"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </AlertDialogCancel>

            <AlertDialogAction onClick={handleDownloadJSON}>
              Download JSON
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="flex items-center justify-center px-2 w-full mt-4">
      <div className="relative md:w-1/3 w-full">
        <input
          type="text"
          placeholder="Enter Website URL"
          ref={inputRef}
          className="w-full py-2 px-4 pr-16 border-2 border-t-pink-600 border-b-green-700 border-l-green-700 rounded-lg focus:outline-none h-12 text-green-700 font-quicksand font-semibold"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-0 top-0 bg-pink-600 h-12 text-white px-4 rounded-lg hover:bg-green-700 focus:outline-none"
        >
          Scrape
        </button>
      </div>
      {isDialogOpen && <SuccessDialog />}
    </div>
  );
};

export default Search;
