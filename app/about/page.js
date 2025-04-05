import Footer from "@/components/Footer";

const AboutPage = () => {
    return (
        <div className="h-190 flex flex-col bg-purple-50 text-gray-800">
            <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-6 text-purple-600">About Bitlink</h1>
                <p className="mb-4 text-lg">
                    Bitlink is a simple and efficient URL shortener built using Next.js, MongoDB, and Tailwind CSS.
                    It allows users to convert long URLs into shorter, customized links for easy sharing and tracking.
                </p>
                <p className="mb-4 text-lg">
                    {"Whether you're a developer or just someone who wants to simplify links, Bitlink provides a clean and user-friendly interface to generate, manage, and access short URLs."}
                </p>
                <p className="text-lg">
                    All links are stored securely, and repeated short URL attempts for the same URL are handled smartly to avoid duplication or conflicts.
                </p>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
