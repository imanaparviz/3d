import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { url } from "inspector";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-no-repeat bg-cover bg-center pt-16"
        style={{ backgroundImage: "url('/way.png')" }}
      >
        <div className="relative" style={{ width: "100%", height: "100vh" }}>
          <div className="fixed inset-0 z-0">
            <iframe
              src="https://my.spline.design/untitled-93993e5bb744816f877031451757e4ef/"
              
              style={{
                width: "110%",
                height: "100%",
                right: "-50%",
                zIndex: "-1",
              }}
            ></iframe>
          </div>
        </div>
        <div className="text-container ">
          <div className="absolute bottom-0 left-0 mx-40 mb-40 py-20 px-5  rounded-lg">
            <h1 className="text-4xl font-bold text-white ">
              Futures Designe Developers....
            </h1>
            <p className="mt-10 custom-scrollbar h32 text-lg text-red-100 overflow-y-auto h-32 pr-5 custom-scrollbar w-80">
              In der Ära der digitalen Renaissance befindet sich das Berufsfeld
              der Entwickler an der Schwelle zu einem neuen Zeitalter – dem des
              Futures Design. Die "Futures Design Developers" sind nicht mehr
              nur Architekten von Code, sondern werden zu Visionären, die die
              Zukunft gestalten. Sie weben das Gewebe der digitalen Welten, in
              denen wir zunehmend leben, arbeiten und spielen. Futures Design
              verbindet traditionelle Entwicklungspraktiken mit den Prinzipien
              des futuristischen Denkens. Diese Entwickler schauen über den Code
              hinaus und erkennen die Muster, die unsere Technologien und
              Gesellschaften formen. Sie sind Grenzgänger zwischen der aktuellen
              Praxis und den Potentialen von morgen, zwischen dem, was ist, und
              dem, was sein könnte. Diese Pioniere des digitalen Zeitalters
              nutzen Tools wie Künstliche Intelligenz, Maschinelles Lernen und
              Data Science, um Anwendungen zu schaffen, die sich selbst
              verbessern, lernen und an die sich ständig ändernden Bedürfnisse
              der Nutzer anpassen. Sie integrieren ethische Überlegungen direkt
              in den Entwicklungsprozess, um sicherzustellen, dass die
              Technologie, die sie schaffen, nicht nur funktional, sondern auch
              gerecht und nachhaltig ist. Die Arbeit der Futures Design
              Developers ist tief verwurzelt im menschlichen Erlebnis. Sie
              gestalten Erfahrungen, die über das visuell Ansprechende
              hinausgehen und emotional resonieren, um echte Verbindungen zu
              schaffen. Indem sie die Schnittstelle zwischen Mensch und Maschine
              neu erfinden, schaffen sie eine Welt, in der Technologie nicht nur
              ein Werkzeug ist, sondern ein integraler Bestandteil eines
              reichhaltigen, menschlichen Lebens. In einem ständigen Dialog mit
              den neuesten Forschungsergebnissen, Trends und Entwicklungen, sind
              Futures Design Developers die Avantgarde einer Bewegung, die
              darauf abzielt, die Zukunft durch Design und Entwicklung zum
              Besseren zu gestalten. Sie leben nicht einfach in der Welt, wie
              sie ist, sondern arbeiten daran, die Welt zu erschaffen, in der
              wir leben wollen.
            </p>
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          backgroundImage: "url('/SectionBackground.png')",
          backgroundSize: "cover",
        }}
      >
        <div className="px-12 mx-12 pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative bg-white/5  backdrop-blur-md p-6 mx-1 my-5 rounded-lg shadow-lg h-60 flex flex-col justify-between overflow-hidden"
            >
              <h3 className="text-xl font-semibold mb-1 z-10">{card.title}</h3>
              <div className="mb-10 overflow-y-auto custom-scrollbar h-20 z-10">
                <p className="text-sm pr-1">{card.content}</p>
              </div>
              <button
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundImage: `url(${card.backgroundImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  border: "none",
                }}
              ></button>
            </div>
          ))}
        </div>
        <div className="relative bottom-0 left-0 right-0 z-10">
          <img src="/baba.png" alt="Baba" />
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
const cards = [
  {
    title: "React - Mehr als nur ein UI-Framework",
    content:
      "React hat mein Verständnis für moderne Webentwicklung geprägt. Durch die Verwendung von Komponenten-basiertem Aufbau und State-Management mit Hooks, kreiere ich interaktive und dynamische Benutzeroberflächen.",
    buttonColor: "bg-gray-400 hover:bg-gray-800",
    backgroundImage: "/react.png",
  },
  {
    title: "Next.js - Das Framework der Zukunft",
    content:
      "Mit Next.js habe ich die Fähigkeit entwickelt, serverseitig gerenderte React-Anwendungen zu erstellen. Es ermöglicht mir, SEO-freundliche und leistungsstarke Webanwendungen zu bauen, mit Features wie automatisiertem Routing und optimiertem Preloading.",
    buttonColor: "bg-blue-500 hover:bg-blue-900",
    backgroundImage: "/next.png",
  },
  {
    title: "Tailwind CSS - Styling mit Effizienz",
    content:
      "Tailwind CSS hat meinen Workflow revolutioniert, indem es Utility-First-Klassen bietet, die mir erlauben, schnelle und responsive Designs zu erstellen, ohne die Konsistenz oder Wartbarkeit zu beeinträchtigen.",
    buttonColor: "bg-gray-400 hover:bg-gray-800",
    backgroundImage: "/tailwind.png",
  },
  {
    title: "HTML - Das Fundament des Web",
    content:
      "HTML ist die Basis jeder Webseite. Meine Fähigkeiten in HTML ermöglichen es mir, strukturierte und semantisch korrekte Webseiten zu erstellen, die als solides Fundament für weiteres Styling und Funktionalität dienen.",
    buttonColor: "bg-blue-500 hover:bg-blue-900",
    backgroundImage: "/html.png",
  },
  {
    title: "CSS - Die Kunst des Webdesigns",
    content:
      "Meine Kenntnisse in CSS ermöglichen es mir, Webseiten nicht nur funktional, sondern auch optisch ansprechend zu gestalten. Ich beherrsche fortgeschrittene Techniken wie Flexbox, Grid und responsive Design, um Benutzererlebnisse zu schaffen, die sowohl ästhetisch als auch benutzerfreundlich sind.",
    buttonColor: "bg-gray-400 hover:bg-gray-800",
    backgroundImage: "/css.png",
  },
  {
    title: "TypeScript - Skalierbare Webentwicklung",
    content:
      "TypeScript bietet mir die Werkzeuge, um größere und komplexere Anwendungen zu entwickeln. Durch Typisierung und kompilierungszeitliche Überprüfungen kann ich Fehler frühzeitig erkennen und die Codequalität und Wartbarkeit verbessern.",
    buttonColor: "bg-blue-500 hover:bg-blue-900",
    backgroundImage: "/type.png",
  },
  {
    title: "ChatGPT - Interaktive KI-Integration",
    content:
      "Meine Erfahrung mit ChatGPT umfasst die Integration von KI-gestützten Konversationsagenten in Webanwendungen. Dies ermöglicht es mir, interaktive und intelligente Benutzererlebnisse zu schaffen, die auf natürliche Sprachverarbeitung und maschinelles Lernen basieren.",
    buttonColor: "bg-gray-400 hover:bg-gray-800",
    backgroundImage: "/chat.png",
  },
  {
    title: "Sonstige - Vielseitiges Toolset",
    content:
      "Meine technischen Fähigkeiten erstrecken sich über eine Vielzahl von Tools und Plattformen. Dazu gehören Figma für UI/UX-Design, Framer für interaktives Prototyping, Unreal Engine 5 und Unity für Spieleentwicklung, Blender für 3D-Modellierung, GitHub für Versionskontrolle, Adobe XD und Photoshop für Grafikdesign sowie die Erstellung kreativer Inhalte mit Midjourney Prompts.",
    buttonColor: "bg-blue-500 hover:bg-blue-900",
    backgroundImage: "/sonstiges.png",
  },
];
export default Home;
