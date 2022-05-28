import Header from "./components/Header";
import TransferForm from "./components/TransferForm";
import WalletBalance from "./components/WalletBalance";

export default function Transfer() {
  return (
    <div className="container p-10 min-w-full">
      <Header message1={"Transfer your"} highlight={"coins"} message2={"here!"} />
      <WalletBalance />
      <TransferForm />
    </div>
  )
}
