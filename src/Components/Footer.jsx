const Footer = () => (
  	<footer className="bg-[#000300]/95 text-gray-300">
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
			<div>
				<div className="flex items-center gap-2">
					<div className="h-8 w-8 rounded bg-gradient-to-br from-indigo-600 to-purple-600" />
					<span className="font-semibold tracking-tight text-white">Billboards</span>
				</div>
				<p className="mt-4 text-sm text-gray-400">Reaching audiences locally and nationally with impactful OOH.</p>
			</div>
			<div>
				<h4 className="text-white font-medium">Advertising</h4>
				<ul className="mt-3 space-y-2 text-sm">
					<li>Formats</li>
					<li>Environments</li>
					<li>Locations</li>
					<li>Programmatic</li>
				</ul>
			</div>
			<div>
				<h4 className="text-white font-medium">Why OOH</h4>
				<ul className="mt-3 space-y-2 text-sm">
					<li>Drives search</li>
					<li>Builds trust</li>
					<li>Mental availability</li>
					<li>DOOH impact</li>
				</ul>
			</div>
			<div>
				<h4 className="text-white font-medium">Company</h4>
				<ul className="mt-3 space-y-2 text-sm">
					<li>Home</li>
					<li>About</li>
					<li>Billboards</li>
					<li>Contact</li>
				</ul>
			</div>
		</div>
		<div className="border-t border-white/10">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm flex flex-col md:flex-row items-center justify-center gap-3">
				<p className="text-gray-400">© 2025 Billboards. All rights reserved.</p>
				
			</div>
		</div>
	</footer>
);

export default Footer;