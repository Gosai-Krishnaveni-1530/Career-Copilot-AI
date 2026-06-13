function Header() {
  return (
    <div
      className="
        bg-[#071426]
        border
        border-cyan-900
        rounded-2xl
        p-6
        flex
        justify-between
        items-center
        mb-8
      "
    >
      <div>
        <h1 className="text-2xl font-bold text-white">
          Resume Analysis Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Last Scan: Just Now
        </p>
      </div>

     
    </div>
  );
}

export default Header;
