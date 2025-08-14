"use client";
import Header from "@/components/Header";
import Lanyard from "@/components/ui/Lanyard/Lanyard";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
// import { Lanyard } from "react-bits"

// This is the main component for the online CV, simulating a terminal and an interactive card.
export default function App() {
  // Use state to manage the terminal's history, current input, and other UI states.
  const [history, setHistory] = useState<{ command: string; output: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [localTime, setLocalTime] = useState<string>("");

  // The central source of truth for all CV data.
  // This is where you will add your own personal information.
  const cvData = {
    name: "Arnav Bhattacharya",
    title: "Backend Developer",
    user: "bhattacharya",
    host: "portfolio",
    commands: [
      "help",
      "about",
      "projects",
      "skills",
      "experience",
      "contact",
      "education",
      "certifications",
      "leadership",
      "sudo",
      "clear",
    ],
    about: `👋 Hello, I'm Arnav Bhattacharya!

I'm a Backend Developer with a passion for building scalable APIs, automation systems, and data-driven applications.

Background:
- Currently a Backend Developer at IBM, working on high-performance API solutions
- Previously at Schneider Electric, where I delivered 20+ enterprise-grade APIs and introduced automated static code analysis (reducing related issues by 30%)
- Built full-stack projects like the Dublin Disaster Management System, Smart Pillow, and Adaptive Dating Application
- Experienced in React.js, Node.js, Docker, Kubernetes, AWS, and machine learning workflows
- Skilled in API integration, CI/CD optimization, and cloud-native development
- Awarded the Governor's Gold Medal for excellence in academics and extracurricular achievements

When not coding, I enjoy cooking, playing badminton, watching anime, and exploring new tech stacks.

Feel free to explore more using the 'projects', 'skills', or 'contact' commands!`,
    projects: `🚀 Projects:

1. Dublin Disaster Management System
   Platform to enhance emergency response and resource allocation in Dublin
   Technologies: MERN Stack (MongoDB, Express.js, React.js, Node.js)
   Link: [Portfolio](https://portfolio-kaalaaadmi.vercel.app/)

2. Smart Pillow
   IoT-enabled pillow that monitors sleep patterns and adjusts comfort automatically
   Technologies: React.js, Node.js, AWS IoT, Python
   Link: [Portfolio](https://portfolio-kaalaaadmi.vercel.app/)

3. Adaptive Dating Application
   AI-powered dating app with personalized match recommendations
   Technologies: MERN Stack, TensorFlow, Express.js
   Link: [Portfolio](https://portfolio-kaalaaadmi.vercel.app/)

4. Restaurant Ratings Prediction
   Machine learning system predicting Dublin restaurant ratings with 85% accuracy
   Technologies: Python, Scikit-learn, Pandas, Jupyter Notebooks
   Link: [Portfolio](https://portfolio-kaalaaadmi.vercel.app/)

Type 'contact' to discuss collaborations!`,
    skills: `💻 Technical Skills:

Programming Languages:
- JavaScript
- Python
- SQL
- HTML/CSS
- XML

Frontend:
- React.js/Next.js
- Redux
- Bootstrap
- Tailwind CSS
- jQuery

Backend:
- Node.js/Express.js
- Spring Boot
- RESTful API Development
- PostgreSQL
- MongoDB

Cloud & DevOps:
- AWS
- Docker/Kubernetes
- CI/CD Pipelines
- APIGEE
- Swagger/Postman

Machine Learning & Tools:
- Scikit-learn
- Pandas & NumPy
- Git/GitHub
- Jupyter Notebooks
- Bash Scripting

Methodologies:
- Agile
- Test-Driven Development (TDD)
- Behaviour-Driven Development (BDD)
- Feature-Driven Development (FDD)
- SOLID Principles`,

    experience: `💼 Work Experience:

Backend Developer | IBM (May 2024 - Present) | Dublin, Ireland
- Developing high-performance backend solutions for enterprise applications
- Optimizing API performance and scalability for critical business systems
- Collaborating in Agile teams to deliver cloud-native features

Software Analyst | Schneider Electric (May 2021 - Aug 2022) | Bengaluru, India
- Spearheaded development of 20+ enterprise-grade APIs using APIGEE, Postman, GIT, Swagger, SQL, and XML
- Introduced automated Static Code Analysis reducing related issues by 30%
- Collaborated on Drupal projects for website development and maintenance
- Improved deployment efficiency through CI/CD pipelines, boosting customer satisfaction by 15%

Graduate Engineer Trainee | Schneider Electric (Aug 2020 - Apr 2021) | Bengaluru, India
- Delivered high-quality APIs for multiple Schneider Electric domains
- Provided technical solutions to improve consumer satisfaction and system reliability

API Intern | Schneider Electric (Jan 2020 - Aug 2020) | Bengaluru, India
- Acquired foundational expertise in APIGEE
- Designed and developed APIs for internal and external consumers

Web Developer Intern | Indian Oil Corporation (May 2018 - Jun 2018) | Mumbai, India
- Developed a Java-based Gate Pass Management System improving hardware tracking efficiency by 40%
- Led testing and debugging efforts, reducing system errors by 20%

Type 'projects' to see my recent work.`,

    contact: `📬 Get In Touch:

Email: arnav264@gmail.com
LinkedIn: /in/arnav-bhattacharya-dublin
Portfolio: portfolio.arnavbhattacharya.com
GitHub: @kaalaaadmi

Feel free to reach out!`,

    education: `🎓 Education:

Master of Science in Computer Science | Trinity College Dublin, Ireland | Sep 2023
- Concentration: Intelligent Systems
- Grade: 2.1
- Relevant Coursework: Machine Learning, Artificial Intelligence, Data Analytics, Software Engineering, Information Retrieval & Web Search, Adaptive Applications, Internet of Things, Text Analysis, Knowledge & Data Engineering

Bachelor of Technology in Computer Science and Engineering | Vellore Institute of Technology, India | Jun 2020
- Concentration: Information Security
- Grade: 1.1
- Relevant Coursework: Data Structures & Algorithms, Computer Architecture, Internet & Web Programming, Artificial Intelligence, Object-Oriented Programming, Statistics and Applications

Additional Learning:
- Continuous professional development through certifications
- Self-guided study in cloud technologies, API development, and artificial intelligence
- Regular participation in hackathons, coding challenges, and open-source projects`,

    certifications: `🏆 Certifications:

Technical Certifications:
- IBM Data Science Specialization
- Foundations of User Experience (UX) Design - Google
- The Fundamentals of Digital Marketing - Google Digital Garage
- Applied Data Science Capstone
- Introduction to Containers, Kubernetes, and OpenShift V2
- Ethical Hacking Course
- Programming with JavaScript
- Meta Front-End Developer Professional Certificate (In Progress)

Industry Recognition:
- Governor's Gold Medal for academic and extracurricular excellence

Visit my LinkedIn profile - 'contact' - for a complete list of certifications.`,

    leadership: `👥 Leadership & Community:

Speaking & Hosting:
- Speaker at tech meetups and university seminars on React.js and API development
- Facilitator for coding workshops and hackathons during university

Community Leadership:
- Active contributor to open-source projects and developer forums
- Volunteer mentor for junior developers at IBM and Schneider Electric

Mentorship:
- Guided interns and new hires on best practices in API design and automation
- Organized internal knowledge-sharing sessions on CI/CD and code quality

I'm passionate about tech community building and continuous learning!`,
    sudo: "Hi, I'm Arnav Bhattacharya, a Backend Developer passionate about APIs, automation, and scalable software solutions.",

    help: `Available commands:
about           - Learn about me
projects        - View my projects
skills          - See my technical skills
experience      - My work experience
contact         - How to reach me
education       - My educational background
certifications  - View my certifications
leadership      - Leadership and community involvement
clear           - Clear the terminal

Type any command to continue...`,
  };

  // Set initial time and update every second if you want live time
  useEffect(() => {
    const updateTime = () => setLocalTime(new Date().toLocaleString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to the bottom of the terminal on every history update
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus the input field on every re-render to keep it active
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  // This function simulates the "typing" effect for the terminal output.
  const typeText = (
    fullOutput: string,
    historyIndex: number,
    callback?: () => void
  ) => {
    let i = 0;
    const interval = setInterval(() => {
      setHistory((prevHistory) => {
        if (i >= fullOutput.length) {
          clearInterval(interval);
          setIsTyping(false);
          if (callback) callback();
          return prevHistory;
        }
        const newHistory = [...prevHistory];
        const lastEntry = newHistory[historyIndex];
        if (lastEntry) {
          newHistory[historyIndex] = {
            ...lastEntry,
            output: fullOutput.substring(0, i + 1),
          };
        }
        i++;
        return newHistory;
      });
    }, 20); // Adjust typing speed here
  };

  // Process the user's command and generate the appropriate output.
  const processCommand = (command: string) => {
    const trimmedCommand = command.trim();
    let output = "";

    switch (trimmedCommand) {
      case "clear":
        setHistory([]);
        setInput(""); // Clear input after command
        return;
      case "help":
        output = cvData.help;
        break;
      case "about":
        output = cvData.about;
        break;
      case "projects":
        output = cvData.projects;
        break;
      case "skills":
        output = cvData.skills;
        break;
      case "experience":
        output = cvData.experience;
        break;
      case "contact":
        output = cvData.contact;
        break;
      case "education":
        output = cvData.education;
        break;
      case "certifications":
        output = cvData.certifications;
        break;
      case "leadership":
        output = cvData.leadership;
        break;
      case "sudo":
        output = cvData.sudo || "bash: sudo: command not found.";
        break;
      default:
        output = `bash: ${trimmedCommand}: command not found.`;
    }

    // Add the new command to history and start the typing effect for the output.
    setIsTyping(true);
    const newHistoryEntry = { command: trimmedCommand, output: "" };

    setHistory((prevHistory) => {
      const newHistory = [...prevHistory, newHistoryEntry];
      const newHistoryIndex = newHistory.length - 1;

      // Pass the full output and the index of the new history entry to the typing function
      typeText(output, newHistoryIndex, () => {
        // Once typing is done, just enable the input again
        setInput("");
        setHistoryIndex(-1);
      });

      return newHistory;
    });
  };

  // Handle keyboard events like Enter and Tab for the input field.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isTyping) return;
      if (input.trim() === "") {
        setHistory((prevHistory) => [
          ...prevHistory,
          { command: "", output: "" },
        ]);
        return;
      }
      processCommand(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocompletion logic
      const matchingCommands = cvData.commands.filter((cmd) =>
        cmd.startsWith(input)
      );
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isTyping) return;
      const pastCommands = history
        .filter((item) => item.command !== "")
        .map((item) => item.command);
      if (pastCommands.length > 0 && historyIndex < pastCommands.length - 1) {
        const newIndex = historyIndex + 1;
        setInput(pastCommands[pastCommands.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (isTyping) return;
      const pastCommands = history
        .filter((item) => item.command !== "")
        .map((item) => item.command);
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setInput(pastCommands[pastCommands.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      } else {
        setInput("");
        setHistoryIndex(-1);
      }
    }
  };

  // A simple component to render the terminal prompt
  const Prompt = ({
    user,
    host,
    path,
    currentInput = "",
  }: {
    user: string;
    host: string;
    path: string;
    currentInput?: string;
  }) => (
    <div className="flex">
      <span className="text-lightblue font-bold">
        {user}@{host}
      </span>
      <span className="text-lightblue">:</span>
      <span className="text-lightblue font-bold">{path}</span>
      <span className="text-lightblue">$</span>
      <span className="pl-2 text-lightgreen">{currentInput}</span>
    </div>
  );

  return (
    <div className="bg-slate-900 h-screen text-white font-mono flex flex-col">
      <Header />
      <style>{`
        @keyframes cursor-blink {
          50% {
            opacity: 0;
          }
        }
        .custom-caret {
          background-color: #00c951;
          width: 8px;
          display: inline-block;
          animation: cursor-blink 1s steps(2, start) infinite;
        }
      `}</style>
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Left Column: Interactive Card */}
        <div
          ref={cardContainerRef}
          className="hidden lg:flex w-full lg:w-2/5 pb-8 pl-8 pr-8 border-r border-t border-b border-lightgreen bg-background relative flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #fff -100%, #0a0a0a 25%)",
            // #0f172a is Tailwind's slate-900, adjust to your bg color if needed
          }}
        >
          <Lanyard
            position={[0, 0, 30]}
            gravity={[0, -40, 0]}
            fov={10}
            transparent={true}
          />
          {/* <div className="relative text-center z-10 p-4 rounded-lg bg-background bg-opacity-70 backdrop-blur-sm">
            <h1 className="text-4xl font-bold mt-8 text-lightgreen">
              {cvData.name}
            </h1>
            <p className="text-xl text-slate-300 mt-2">{cvData.title}</p>
          </div> */}
          <div className="absolute bottom-4 right-4 text-lightgreen text-xs">
            [Interactive 3D Card]
          </div>
        </div>

        {/* Right Column: Terminal */}
        <div className="w-full lg:w-3/5 p-1 flex flex-col bg-background border-t border-b border-lightgreen flex-1 min-h-0">
          <div
            className="flex-1 overflow-y-auto px-4 pt-4"
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Header with quick commands */}
            <div className="text-sm text-lightgreen mb-4 whitespace-normal border-b border-lightgreen pb-1">
              {cvData.commands.map((cmd, index) => (
                <span key={index} className="text-lightgreen">
                  {cmd}
                  {index < cvData.commands.length - 1 ? " | " : ""}
                </span>
              ))}
            </div>

            {/* Render past commands and outputs */}
            {history.map((entry, index) => (
              <div key={index}>
                <Prompt
                  user={cvData.user}
                  host={cvData.host}
                  path="~"
                  currentInput={entry.command}
                />
                {entry.output &&
                  (entry.command === "contact" ? (
                    <pre className="whitespace-pre-wrap text-white py-2">
                      {entry.output.split("\n").map((line, i) => {
                        // LinkedIn special handling
                        if (/^\s*LinkedIn:/i.test(line)) {
                          const match = line.match(/LinkedIn:\s*(.*)/i);
                          const profile = match ? match[1].trim() : "";
                          const url = profile
                            ? `https://linkedin.com/${profile.replace(
                                /^\/+/,
                                ""
                              )}`
                            : "https://linkedin.com";
                          return (
                            <div key={i} style={{ display: "block" }}>
                              LinkedIn:{" "}
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lightblue underline"
                              >
                                {profile}
                              </a>
                            </div>
                          );
                        }
                        // GitHub special handling
                        if (/^\s*GitHub:/i.test(line)) {
                          const match = line.match(/GitHub:\s*(.*)/i);
                          const text = match ? match[1].trim() : "";
                          return (
                            <div key={i} style={{ display: "block" }}>
                              GitHub:{" "}
                              <a
                                href="https://github.com/KaalaAadmi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lightblue underline"
                              >
                                {text}
                              </a>
                            </div>
                          );
                        }
                        // Regex for URLs and emails
                        const urlRegex =
                          /(https?:\/\/[^\s]+|portfolio\.[^\s]+)/gi;
                        const emailRegex =
                          /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
                        let processedLine = line;
                        // First, replace emails
                        processedLine = processedLine.replace(
                          emailRegex,
                          (email) =>
                            `<a href="mailto:${email}" target="_blank" rel="noopener noreferrer" class="text-lightblue underline">${email}</a>`
                        );
                        // Then, replace URLs
                        processedLine = processedLine.replace(
                          urlRegex,
                          (url) => {
                            let href = url;
                            if (!href.startsWith("http")) {
                              href =
                                "https://" + href.replace(/^portfolio\./, "");
                            }
                            return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-lightblue underline">${url}</a>`;
                          }
                        );
                        return (
                          <div
                            key={i}
                            style={{ display: "block" }}
                            dangerouslySetInnerHTML={{
                              __html: processedLine || "\u00A0",
                            }}
                          />
                        );
                      })}
                    </pre>
                  ) : (
                    <pre className="whitespace-pre-wrap text-white py-2">
                      {entry.output}
                    </pre>
                  ))}
              </div>
            ))}

            {/* Current input prompt */}
            <div className="flex items-center">
              <Prompt user={cvData.user} host={cvData.host} path="~" />
              <div className="relative flex-1 ml-2">
                <input
                  ref={inputRef}
                  className="bg-transparent border-none text-lightgreen outline-none w-full caret-transparent"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                  autoFocus
                />
                <div className="absolute inset-0 flex items-center pointer-events-none">
                  <span className="text-lightgreen">{input}</span>
                  {!isTyping && (
                    <span className="custom-caret h-4 align-bottom"></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row / Status bar */}
      <div className="flex justify-between items-center text-sm px-4 py-2 bg-background border-t border-slate-700 w-full">
        <div className="flex items-center space-x-2">
          <span className="text-lightgreen font-bold">
            {cvData.user}@{cvData.host}
          </span>
          <span className="text-lightgreen">~</span>
        </div>
        {/* Fix time. Make it in the time zone of the user */}
        <span className="text-lightgreen">{localTime}</span>
      </div>
    </div>
  );
}
