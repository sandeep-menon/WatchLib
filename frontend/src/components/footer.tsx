import { Github, Globe, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

function Footer() {
    const openHomePage = () => {
        window.open("https://sandeep-menon.github.io", "_blank");
    }
    const openLinkedIn = () => {
        window.open("https://www.linkedin.com/in/sandeep-menon-7917121a/", "_blank");
    }
    const openGitHub = () => {
        window.open("https://github.com/sandeep-menon", "_blank");
    }
    return (
        <div className="border-t border-dashed">
            <div className="max-w-[1400px] mx-auto w-full p-4 flex justify-between items-center">
                <div className="text-balance text-center text-sm leading-loose text-muted-foreground">Built by <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="link">@sandeep-menon</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-60">
                        <div className="flex justify-around items-center">
                            <Avatar>
                                <AvatarImage src="https://github.com/sandeep-menon.png" />
                                <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-start items-center gap-4">
                                <h4 className="text-sm font-semibold">Sandeep Menon</h4>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" onClick={openHomePage} title="Website"><Globe /></Button>
                                    <Button variant="outline" size="icon" onClick={openLinkedIn} title="LinkedIn"><Linkedin /></Button>
                                    <Button variant="outline" size="icon" onClick={openGitHub} title="Github"><Github /></Button>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard></div>
                <div className="text-balance text-center text-xs leading-loose text-muted-foreground">This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</div>
            </div>
        </div>
    )
}

export default Footer;