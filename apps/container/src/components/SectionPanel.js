export default function SectionPanel({ eyebrow, title, description, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300">
        {eyebrow}
      </p>
      <div className="mt-3 mb-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm text-slate-300">{description}</p>
      </div>
      {children}
    </section>
  );
}
