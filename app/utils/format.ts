export const formatDate = (
  date: string | Date,
  suffix = "Published, "
): string => {
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date"
  }
  return (
    suffix
    + parsedDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  )
}

export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(`${key}[]`, item instanceof Blob ? item : item.toString()))
    }
    else if (value instanceof Blob) {
      formData.append(key, value)
    }
    else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      formData.append(key, JSON.stringify(value))
    }
  })

  return formData
}

export function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {}

  formData.forEach((value, key) => {
    const normalizedKey = key.endsWith("[]") ? key.slice(0, -2) : key

    if (!obj[normalizedKey]) {
      obj[normalizedKey] = key.endsWith("[]") ? [] : null
    }

    if (Array.isArray(obj[normalizedKey])) {
      obj[normalizedKey].push(value instanceof Blob ? value : JSON.parse(value as string))
    }
    else {
      obj[normalizedKey] = value instanceof Blob ? value : JSON.parse(value as string)
    }
  })

  return obj
}