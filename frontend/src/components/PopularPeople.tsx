import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("!!!!!!! Using API_BASE_URL: ", API_BASE_URL);

const fetchPeople = async ({ pageParam = 1 }) => {
    console.log(`Fetching page: ${pageParam}`);
    const res = await fetch(`${API_BASE_URL}/person/popular?page=${pageParam}`);
    return res.json();
};

function PopularPeople() {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["popularPeople"],
        queryFn: fetchPeople,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
        },
    });

    const people = data?.pages.flatMap((page) => page.results) || [];

    useEffect(() => {
        if (!loadMoreRef.current) {
            console.warn("🚨 loadMoreRef is NULL! Check if the div is rendered.");
            return;
        }

        // If observer already exists, disconnect before reassigning
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                console.log(`👀 Intersection Observer - isIntersecting: ${entry.isIntersecting}`);
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    console.log("🚀 Fetching next page...");
                    fetchNextPage();
                }
            },
            { root: null, rootMargin: "100px", threshold: 0.1 }
        );

        observerRef.current.observe(loadMoreRef.current);
        console.log("✅ Observer attached to loadMoreRef");

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                console.log("🔌 Observer disconnected.");
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, data]);

    return (
        <div className="max-w-[1400px] mx-auto w-full p-4">
            <div className="text-xl font-serif text-primary font-semibold">Popular (in people)</div>

            <ScrollArea className="w-full overflow-x-auto whitespace-nowrap p-4">
                <div className="flex gap-4 select-none">
                    {people.map((person) => (
                        <motion.div key={person.id}>
                            <Card className="w-[150px] h-[220px] flex flex-col items-center justify-center">
                                {person.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`}
                                        alt={person.name}
                                        className="w-full h-3/4 object-cover rounded-t-md"
                                    />
                                ) : (
                                    <Skeleton className="w-full h-3/4" />
                                )}
                                <CardContent className="p-2 text-center">
                                    <p className="text-sm font-medium">{person.name}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                    
                    {/* Loading Spinner that serves as our intersection target */}
                    {hasNextPage && (
                        <div 
                            ref={loadMoreRef} 
                            className="flex items-center justify-center h-[220px] w-16 flex-shrink-0"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className={`h-8 w-8 text-primary ${isFetchingNextPage ? 'animate-spin' : ''}`} />
                                <span className="text-xs text-muted-foreground">
                                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}

export default PopularPeople;