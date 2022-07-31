// Стоимость одной бутыли с учётом количества/скидки
export function getCostOneBottle(count) {
  if (count === 1) {
    return 205
  }
  if (count >= 2 && count <= 3) {
    return 220
  }
  if (count >= 4 && count <= 9) {
    return 185
  }
  if (count >= 20) {
    return 200
  }
  if (count >= 10) {
    return 165
  }
}

// Общая стоимость n-ого количества бутылей
export function getCommonCostBottles(count) {
  return count * getCostOneBottle(count)
}
