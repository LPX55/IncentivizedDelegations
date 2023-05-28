import Navbar from "../components/navigation/navbar";

export default function MainLayout({ children }) {
	return (
		<div className="max-w-4xl mx-auto">
            <Navbar />
            {children}
		</div>
	);
}
