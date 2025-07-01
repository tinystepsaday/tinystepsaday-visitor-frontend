import { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
}

export default function NotFound() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "404 - Page Not Found",
        description: "The page you are looking for does not exist.",
    }
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </div>
    );
}