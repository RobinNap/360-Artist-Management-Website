/**
 * 360° Artist Management - Lesson Content Data
 * This file contains all lesson content for the interactive course
 */

const lessonData = {
    onboarding: {
        name: "Onboarding",
        lessons: [
            {
                id: "onb-01",
                number: 1,
                total: 14,
                title: "Welcome",
                slug: "01-welcome",
                description: "Congratulations on taking the first step toward transforming your passion into a profession. This course will give you the complete 360° toolkit to build a sustainable music career.",
                objectives: [
                    "Understand the complete artist development framework and what it takes to go professional",
                    "Set clear expectations for your learning journey and career transformation",
                    "Get an overview of the six core pillars of artist management"
                ],
                concepts: [
                    {
                        title: "The Hobby vs. Professional Mindset",
                        content: `<p>The biggest difference between a hobby artist and a professional isn't just about talent—it's about treating your art as a business. This means:</p>
                        <ul>
                            <li><strong>Consistency:</strong> Showing up regularly, even when you don't feel inspired</li>
                            <li><strong>Strategy:</strong> Having a plan for releases, marketing, and growth</li>
                            <li><strong>Professionalism:</strong> Meeting deadlines, responding promptly, being reliable</li>
                            <li><strong>Investment:</strong> Spending time and resources on your development</li>
                        </ul>`
                    },
                    {
                        title: "The 360° Framework",
                        content: `<p>A successful music career requires mastery across multiple domains:</p>
                        <ol>
                            <li><strong>Onboarding & Branding:</strong> Building your identity and visual presence</li>
                            <li><strong>Management:</strong> Understanding artist cycles, fan journeys, and networking</li>
                            <li><strong>Marketing:</strong> Promoting your music and growing your audience</li>
                            <li><strong>Bookings:</strong> Getting gigs at clubs, festivals, and events</li>
                            <li><strong>Finance:</strong> Managing income, expenses, royalties, and budgets</li>
                            <li><strong>Legal:</strong> Protecting yourself with contracts and understanding your rights</li>
                        </ol>`
                    }
                ],
                exercise: {
                    title: "Why Are You Here?",
                    description: "Take a moment to reflect on your 'why.' What made you decide to take this course? What does a successful music career look like to you?",
                    placeholder: "Write your thoughts here... What's driving you to go professional? What does success look like for you in 1 year? 5 years?"
                },
                quiz: {
                    question: "What's the MOST important difference between a hobby artist and a professional?",
                    options: [
                        { text: "Having more talent than others", correct: false },
                        { text: "Being signed to a record label", correct: false },
                        { text: "Treating your art as a business with strategy and consistency", correct: true },
                        { text: "Having expensive equipment", correct: false }
                    ],
                    correctFeedback: "Correct! The professional mindset—treating your art as a business—is what separates hobbyists from professionals.",
                    incorrectFeedback: "Not quite. While that can play a role, the real difference is in how you approach your career."
                },
                actions: [
                    { title: "Complete the reflection exercise above", description: "Write down your 'why' and vision for success" },
                    { title: "Create a dedicated folder for course materials", description: "Organize worksheets, notes, and resources you'll create" },
                    { title: "Schedule 30 minutes daily for this course", description: "Block time in your calendar for consistent learning" }
                ],
                prevLesson: null,
                nextLesson: { slug: "02-branding", title: "Branding" }
            },
            {
                id: "onb-02",
                number: 2,
                total: 14,
                title: "Branding",
                slug: "02-branding",
                description: "Your brand is more than a logo—it's the complete experience people have with you as an artist. Learn how to create a cohesive, memorable identity.",
                prevLesson: { slug: "01-welcome", title: "Welcome" },
                nextLesson: { slug: "03-core-values", title: "Core Values" }
            },
            {
                id: "onb-03",
                number: 3,
                total: 14,
                title: "Core Values",
                slug: "03-core-values",
                description: "Discover the fundamental beliefs and principles that will guide every decision in your music career.",
                prevLesson: { slug: "02-branding", title: "Branding" },
                nextLesson: { slug: "04-visualization", title: "Visualization" }
            },
            {
                id: "onb-04",
                number: 4,
                total: 14,
                title: "Visualization",
                slug: "04-visualization",
                description: "Learn powerful visualization techniques to clarify your goals and manifest your ideal career.",
                prevLesson: { slug: "03-core-values", title: "Core Values" },
                nextLesson: { slug: "05-artist-name", title: "Artist Name" }
            },
            {
                id: "onb-05",
                number: 5,
                total: 14,
                title: "Artist Name",
                slug: "05-artist-name",
                description: "Choose or refine your artist name—one of the most important branding decisions you'll make.",
                prevLesson: { slug: "04-visualization", title: "Visualization" },
                nextLesson: { slug: "06-logo", title: "Logo" }
            },
            {
                id: "onb-06",
                number: 6,
                total: 14,
                title: "Logo",
                slug: "06-logo",
                description: "Create a visual symbol that represents your brand and makes you instantly recognizable.",
                prevLesson: { slug: "05-artist-name", title: "Artist Name" },
                nextLesson: { slug: "07-moodboard", title: "Moodboard" }
            },
            {
                id: "onb-07a",
                number: 7,
                total: 14,
                title: "Moodboard",
                slug: "07-moodboard",
                description: "Develop your visual direction by curating images, colors, and styles that represent your brand.",
                prevLesson: { slug: "06-logo", title: "Logo" },
                nextLesson: { slug: "08-press-photos", title: "Press Photos" }
            },
            {
                id: "onb-07b",
                number: 8,
                total: 14,
                title: "Press Photos",
                slug: "08-press-photos",
                description: "Get professional photos that capture your essence and work across all platforms.",
                prevLesson: { slug: "07-moodboard", title: "Moodboard" },
                nextLesson: { slug: "09-biography", title: "Biography" }
            },
            {
                id: "onb-08",
                number: 9,
                total: 14,
                title: "Biography",
                slug: "09-biography",
                description: "Craft a compelling artist biography that tells your story and connects with your audience.",
                prevLesson: { slug: "08-press-photos", title: "Press Photos" },
                nextLesson: { slug: "10-stage-performance", title: "Stage Performance" }
            },
            {
                id: "onb-09",
                number: 10,
                total: 14,
                title: "Stage Performance",
                slug: "10-stage-performance",
                description: "Develop your stage presence and create memorable live experiences for your audience.",
                prevLesson: { slug: "09-biography", title: "Biography" },
                nextLesson: { slug: "11-tone-of-voice", title: "Tone of Voice" }
            },
            {
                id: "onb-10",
                number: 11,
                total: 14,
                title: "Tone of Voice",
                slug: "11-tone-of-voice",
                description: "Define how you communicate with your audience across all channels and touchpoints.",
                prevLesson: { slug: "10-stage-performance", title: "Stage Performance" },
                nextLesson: { slug: "12-your-sound", title: "Your Sound" }
            },
            {
                id: "onb-11",
                number: 12,
                total: 14,
                title: "Your Sound",
                slug: "12-your-sound",
                description: "Identify and refine the unique sonic elements that make your music distinctively yours.",
                prevLesson: { slug: "11-tone-of-voice", title: "Tone of Voice" },
                nextLesson: { slug: "13-online-presence", title: "Online Presence" }
            },
            {
                id: "onb-12",
                number: 13,
                total: 14,
                title: "Online Presence",
                slug: "13-online-presence",
                description: "Build and optimize your digital footprint across social media and streaming platforms.",
                prevLesson: { slug: "12-your-sound", title: "Your Sound" },
                nextLesson: { slug: "14-press-kit", title: "Press Kit (EPK)" }
            },
            {
                id: "onb-13",
                number: 14,
                total: 14,
                title: "Press Kit (EPK)",
                slug: "14-press-kit",
                description: "Create a professional Electronic Press Kit that opens doors with bookers, labels, and media.",
                prevLesson: { slug: "13-online-presence", title: "Online Presence" },
                nextLesson: null,
                nextModule: { path: "../management.html", title: "Management" }
            }
        ]
    },
    management: {
        name: "Management",
        lessons: [
            {
                id: "mgmt-01",
                number: 1,
                total: 4,
                title: "Artist DNA",
                slug: "01-artist-dna",
                description: "Discover what makes you unique as an artist and how to leverage your authentic identity.",
                prevLesson: null,
                nextLesson: { slug: "02-artist-cycle", title: "The Artist Cycle" }
            },
            {
                id: "mgmt-02",
                number: 2,
                total: 4,
                title: "The Artist Cycle",
                slug: "02-artist-cycle",
                description: "Understand the phases of an artist's career and how to navigate each stage successfully.",
                prevLesson: { slug: "01-artist-dna", title: "Artist DNA" },
                nextLesson: { slug: "03-fan-journey", title: "The Fan Journey" }
            },
            {
                id: "mgmt-03",
                number: 3,
                total: 4,
                title: "The Fan Journey",
                slug: "03-fan-journey",
                description: "Map how fans discover, engage with, and become loyal supporters of your music.",
                prevLesson: { slug: "02-artist-cycle", title: "The Artist Cycle" },
                nextLesson: { slug: "04-building-network", title: "Building Your Network" }
            },
            {
                id: "mgmt-04",
                number: 4,
                total: 4,
                title: "Building Your Network",
                slug: "04-building-network",
                description: "Learn how to connect with industry professionals and build relationships that advance your career.",
                prevLesson: { slug: "03-fan-journey", title: "The Fan Journey" },
                nextLesson: null,
                nextModule: { path: "../marketing.html", title: "Marketing" }
            }
        ]
    },
    marketing: {
        name: "Marketing",
        lessons: [
            {
                id: "mkt-01",
                number: 1,
                total: 8,
                title: "What is Marketing?",
                slug: "01-what-is-marketing",
                description: "Understand the fundamentals of marketing and why it's essential for artist success.",
                prevLesson: null,
                nextLesson: { slug: "02-newsworthiness", title: "Newsworthiness" }
            },
            {
                id: "mkt-02",
                number: 2,
                total: 8,
                title: "Newsworthiness",
                slug: "02-newsworthiness",
                description: "Learn what makes content newsworthy and how to create buzz-worthy moments.",
                prevLesson: { slug: "01-what-is-marketing", title: "What is Marketing?" },
                nextLesson: { slug: "03-reaching-out", title: "Reaching Out" }
            },
            {
                id: "mkt-03",
                number: 3,
                total: 8,
                title: "Reaching Out",
                slug: "03-reaching-out",
                description: "Master the art of outreach to media, blogs, playlists, and industry contacts.",
                prevLesson: { slug: "02-newsworthiness", title: "Newsworthiness" },
                nextLesson: { slug: "04-press-release", title: "Writing a Press Release" }
            },
            {
                id: "mkt-04",
                number: 4,
                total: 8,
                title: "Writing a Press Release",
                slug: "04-press-release",
                description: "Craft professional press releases that get your music covered by media.",
                prevLesson: { slug: "03-reaching-out", title: "Reaching Out" },
                nextLesson: { slug: "05-newsletter", title: "Writing a Newsletter" }
            },
            {
                id: "mkt-05",
                number: 5,
                total: 8,
                title: "Writing a Newsletter",
                slug: "05-newsletter",
                description: "Build direct relationships with fans through engaging email newsletters.",
                prevLesson: { slug: "04-press-release", title: "Writing a Press Release" },
                nextLesson: { slug: "06-storytelling", title: "Storytelling" }
            },
            {
                id: "mkt-06",
                number: 6,
                total: 8,
                title: "Storytelling",
                slug: "06-storytelling",
                description: "Use narrative techniques to create deeper connections with your audience.",
                prevLesson: { slug: "05-newsletter", title: "Writing a Newsletter" },
                nextLesson: { slug: "07-creating-content", title: "Creating Content" }
            },
            {
                id: "mkt-07",
                number: 7,
                total: 8,
                title: "Creating Content",
                slug: "07-creating-content",
                description: "Develop a content strategy that keeps your audience engaged between releases.",
                prevLesson: { slug: "06-storytelling", title: "Storytelling" },
                nextLesson: { slug: "08-control-content", title: "Control Your Content" }
            },
            {
                id: "mkt-08",
                number: 8,
                total: 8,
                title: "Control Your Content",
                slug: "08-control-content",
                description: "Manage your content calendar and maintain consistency across platforms.",
                prevLesson: { slug: "07-creating-content", title: "Creating Content" },
                nextLesson: null,
                nextModule: { path: "../bookings.html", title: "Bookings" }
            }
        ]
    },
    bookings: {
        name: "Bookings",
        lessons: [
            {
                id: "book-01",
                number: 1,
                total: 10,
                title: "What Type of DJ Are You?",
                slug: "01-dj-type",
                description: "Identify your DJ style and niche to target the right opportunities.",
                prevLesson: null,
                nextLesson: { slug: "02-find-stage", title: "Find Your Stage" }
            },
            {
                id: "book-02",
                number: 2,
                total: 10,
                title: "Find Your Stage",
                slug: "02-find-stage",
                description: "Discover which venues and events align with your style and career goals.",
                prevLesson: { slug: "01-dj-type", title: "What Type of DJ Are You?" },
                nextLesson: { slug: "03-booked-club", title: "Getting Booked at a Club" }
            },
            {
                id: "book-03",
                number: 3,
                total: 10,
                title: "Getting Booked at a Club",
                slug: "03-booked-club",
                description: "Learn the strategies and approaches to land your first club bookings.",
                prevLesson: { slug: "02-find-stage", title: "Find Your Stage" },
                nextLesson: { slug: "04-booked-festival", title: "Getting Booked at a Festival" }
            },
            {
                id: "book-04",
                number: 4,
                total: 10,
                title: "Getting Booked at a Festival",
                slug: "04-booked-festival",
                description: "Understand the festival booking process and how to stand out to programmers.",
                prevLesson: { slug: "03-booked-club", title: "Getting Booked at a Club" },
                nextLesson: { slug: "05-write-booker", title: "How To Write A Booker" }
            },
            {
                id: "book-05",
                number: 5,
                total: 10,
                title: "How To Write A Booker",
                slug: "05-write-booker",
                description: "Craft compelling emails that get responses from venue bookers and promoters.",
                prevLesson: { slug: "04-booked-festival", title: "Getting Booked at a Festival" },
                nextLesson: { slug: "06-riders", title: "Build Your Riders" }
            },
            {
                id: "book-06",
                number: 6,
                total: 10,
                title: "Build Your Riders",
                slug: "06-riders",
                description: "Create professional technical and hospitality riders for your performances.",
                prevLesson: { slug: "05-write-booker", title: "How To Write A Booker" },
                nextLesson: { slug: "07-setlist", title: "Create a Setlist" }
            },
            {
                id: "book-07",
                number: 7,
                total: 10,
                title: "Create a Setlist",
                slug: "07-setlist",
                description: "Build dynamic setlists that take your audience on a journey.",
                prevLesson: { slug: "06-riders", title: "Build Your Riders" },
                nextLesson: { slug: "08-booking-info", title: "Track Booking Information" }
            },
            {
                id: "book-08",
                number: 8,
                total: 10,
                title: "Track Booking Information",
                slug: "08-booking-info",
                description: "Organize and manage all your booking details professionally.",
                prevLesson: { slug: "07-setlist", title: "Create a Setlist" },
                nextLesson: { slug: "09-prepare-performance", title: "Preparing Your Performance" }
            },
            {
                id: "book-09",
                number: 9,
                total: 10,
                title: "Preparing Your Performance",
                slug: "09-prepare-performance",
                description: "Get ready for showtime with thorough preparation and planning.",
                prevLesson: { slug: "08-booking-info", title: "Track Booking Information" },
                nextLesson: { slug: "10-lasting-impression", title: "Making a Lasting Impression" }
            },
            {
                id: "book-10",
                number: 10,
                total: 10,
                title: "Making a Lasting Impression",
                slug: "10-lasting-impression",
                description: "Leave every gig with new fans, connections, and future opportunities.",
                prevLesson: { slug: "09-prepare-performance", title: "Preparing Your Performance" },
                nextLesson: null,
                nextModule: { path: "../finance.html", title: "Finance" }
            }
        ]
    },
    finance: {
        name: "Finance",
        lessons: [
            {
                id: "fin-01",
                number: 1,
                total: 5,
                title: "Flows of Income",
                slug: "01-income-flows",
                description: "Understand the multiple revenue streams available to modern artists.",
                prevLesson: null,
                nextLesson: { slug: "02-invoicing", title: "Invoicing" }
            },
            {
                id: "fin-02",
                number: 2,
                total: 5,
                title: "Invoicing",
                slug: "02-invoicing",
                description: "Create professional invoices and manage your billing like a business.",
                prevLesson: { slug: "01-income-flows", title: "Flows of Income" },
                nextLesson: { slug: "03-profit-loss", title: "Calculate Your Profit & Loss" }
            },
            {
                id: "fin-03",
                number: 3,
                total: 5,
                title: "Calculate Your Profit & Loss",
                slug: "03-profit-loss",
                description: "Track your financial performance and understand where your money goes.",
                prevLesson: { slug: "02-invoicing", title: "Invoicing" },
                nextLesson: { slug: "04-budgeting", title: "Budgeting" }
            },
            {
                id: "fin-04",
                number: 4,
                total: 5,
                title: "Budgeting",
                slug: "04-budgeting",
                description: "Plan your spending and investments for sustainable career growth.",
                prevLesson: { slug: "03-profit-loss", title: "Calculate Your Profit & Loss" },
                nextLesson: { slug: "05-royalties", title: "Royalties" }
            },
            {
                id: "fin-05",
                number: 5,
                total: 5,
                title: "Royalties",
                slug: "05-royalties",
                description: "Understand how music royalties work and ensure you get paid for your work.",
                prevLesson: { slug: "04-budgeting", title: "Budgeting" },
                nextLesson: null,
                nextModule: { path: "../legal.html", title: "Legal" }
            }
        ]
    },
    legal: {
        name: "Legal",
        lessons: [
            {
                id: "leg-01",
                number: 1,
                total: 3,
                title: "Signing a Record Deal",
                slug: "01-record-deal",
                description: "Navigate record deal negotiations and understand what you're signing.",
                prevLesson: null,
                nextLesson: { slug: "02-management-agreement", title: "Signing a Management Agreement" }
            },
            {
                id: "leg-02",
                number: 2,
                total: 3,
                title: "Signing a Management Agreement",
                slug: "02-management-agreement",
                description: "Evaluate management contracts and protect your interests.",
                prevLesson: { slug: "01-record-deal", title: "Signing a Record Deal" },
                nextLesson: { slug: "03-music-rights", title: "Basic Music Rights" }
            },
            {
                id: "leg-03",
                number: 3,
                total: 3,
                title: "Basic Music Rights",
                slug: "03-music-rights",
                description: "Understand copyright, publishing, and master rights in the music industry.",
                prevLesson: { slug: "02-management-agreement", title: "Signing a Management Agreement" },
                nextLesson: null,
                nextModule: null,
                isFinal: true
            }
        ]
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = lessonData;
}

