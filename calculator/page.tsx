import type React from "react"
import { useTranslation } from "react-i18next"

const CalculatorPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t("calculator.title")}</h1>
      <p>{t("calculator.description")}</p>
      <button>{t("order.submitButton")}</button>
      {/* rest of code here */}
    </div>
  )
}

export default CalculatorPage
