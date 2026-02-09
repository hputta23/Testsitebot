

const clients = [
    'Symantec', 'Wells Fargo', 'Amazon', 'Cisco', 'ServiceNow', 'Oracle'
];

const ClientLogoGrid = () => {
    return (
        <div className="py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <span className="text-accent font-semibold tracking-wider text-sm uppercase">Trusted by Industry Leaders</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {clients.map((client, index) => (
                        <div key={index} className="w-32 h-12 flex items-center justify-center">
                            {/* Placeholder for Logos - Replacing text with stylized blocks for visual appeal if images are missing */}
                            <span className="text-xl font-bold text-gray-400 hover:text-primary transition-colors cursor-default">
                                {client}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientLogoGrid;
