const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center items-center">
      <div className="max-w-lg text-center">
        <blockquote className="text-xl font-serif italic">
          "Innovation is the key to success, and this chat application
          exemplifies just that. It has redefined the way we communicate and
          collaborate, leading to unprecedented efficiency and productivity."
        </blockquote>
        <cite className="block mt-4 text-lg font-semibold">David Johnson</cite>
        <p className="text-sm font-light text-slate-400">
          CEO, Tech Innovations Inc.
        </p>
      </div>
    </div>
  );
};

export default Quote;
