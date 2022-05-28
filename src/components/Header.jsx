export default function Header({ message1, highlight, message2 }) {
  return (
    <div className="w-full text-center">
      <h3 className="font-medium text-6xl text-white">
        { message1 } <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{highlight}</span> { message2 }
      </h3>
    </div>
  )
}
