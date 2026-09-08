export function matchOpportunities(items, profile) {
  const { level, institution, goal } = profile;
  return items
    .filter((item) => item.eligiblePeru)
    .filter((item) => item.profiles.includes(level))
    .filter((item) => item.goals.includes(goal))
    .filter((item) => item.homeInstitutions.includes("cualquiera") || item.homeInstitutions.includes(institution))
    .sort((a, b) => priority(a.status) - priority(b.status));
}

export function findOpportunity(items, id) {
  return items.find((item) => item.id === id);
}

export function validateCatalog(items) {
  const errors = [];
  const ids = new Set();
  for (const [index, item] of items.entries()) {
    const where = `opportunities[${index}]`;
    for (const key of ["id", "name", "eligiblePeru", "profiles", "goals", "status", "officialUrl", "verifiedAt"]) {
      if (item[key] === undefined || item[key] === "") errors.push(`${where}.${key} es obligatorio`);
    }
    if (ids.has(item.id)) errors.push(`${where}.id está duplicado: ${item.id}`);
    ids.add(item.id);
    if (item.officialUrl && !item.officialUrl.startsWith("https://")) errors.push(`${where}.officialUrl debe usar HTTPS`);
  }
  return errors;
}

function priority(status) {
  return { open: 0, preparing: 1, host: 2, "admission-first": 3, check: 4, closed: 5, "not-eligible": 6 }[status] ?? 9;
}
