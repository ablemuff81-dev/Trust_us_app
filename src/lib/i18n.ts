/* eslint-disable */
export type LanguageCode = "en" | "mg" | "fr" | "it" | "de";

export type TranslationKey =
  | "app.name"
  | "app.tagline"
  | "app.currency"
  | "app.slogan"
  | "app.month"
  | "landing.title"
  | "landing.subtitle"
  | "landing.trustLine"
  | "landing.badge"
  | "landing.featuresTitle"
  | "landing.featuresSubtitle"
  | "landing.stepsTitle"
  | "landing.step1.title"
  | "landing.step1.body"
  | "landing.step2.title"
  | "landing.step2.body"
  | "landing.step3.title"
  | "landing.step3.body"
  | "landing.stats.languages"
  | "landing.stats.currency"
  | "landing.stats.storage"
  | "landing.stats.storageValue"
  | "landing.stats.sync"
  | "landing.stats.syncValue"
  | "landing.footerRights"
  | "landing.mock.balance"
  | "landing.mock.card"
  | "landing.mock.quick"
  | "landing.mock.recent"
  | "landing.mock.calendar"
  | "landing.mock.statement"
  | "landing.mock.income"
  | "landing.mock.expenses"
  | "landing.primaryCta"
  | "landing.secondaryCta"
  | "landing.feature.calendar.title"
  | "landing.feature.calendar.body"
  | "landing.feature.report.title"
  | "landing.feature.report.body"
  | "landing.feature.auth.title"
  | "landing.feature.auth.body"
  | "landing.feature.sync.title"
  | "landing.feature.sync.body"
  | "landing.feature.multi.title"
  | "landing.feature.multi.body"
  | "landing.feature.language.title"
  | "landing.feature.language.body"
  | "home.welcomeBack"
  | "home.guestName"
  | "home.totalBalance"
  | "home.monthSpend"
  | "home.entries"
  | "home.recent"
  | "home.empty"
  | "home.emptyHint"
  | "home.quickAdd"
  | "home.todaySpend"
  | "home.balanceHidden"
  | "home.showBalance"
  | "home.hideBalance"
  | "home.budgetLeft"
  | "home.topCategory"
  | "home.sync.synced"
  | "home.sync.syncing"
  | "home.sync.local"
  | "home.sync.signIn"
  | "expense.newTitle"
  | "expense.editTitle"
  | "expense.amount"
  | "expense.description"
  | "expense.category"
  | "expense.date"
  | "expense.dateHint"
  | "expense.invalidAmount"
  | "expense.pickDates"
  | "expense.dates"
  | "expense.datesSelected"
  | "expense.descriptionPlaceholder"
  | "expense.added"
  | "expense.updated"
  | "expense.manageCategories"
  | "expense.categoryDone"
  | "expense.addTitle"
  | "income.amount"
  | "income.description"
  | "income.descriptionPlaceholder"
  | "income.source"
  | "income.sourcePlaceholder"
  | "income.date"
  | "income.time"
  | "income.timePlaceholder"
  | "income.invalidAmount"
  | "income.added"
  | "income.subtitle"
  | "income.history"
  | "income.historyHint"
  | "income.historyEmpty"
  | "income.delete"
  | "calendar.title"
  | "calendar.subtitle"
  | "calendar.selected"
  | "calendar.selectedOne"
  | "calendar.clearSelection"
  | "calendar.deleteSelected"
  | "calendar.dayTotal"
  | "calendar.noExpenses"
  | "calendar.dayListTitle"
  | "calendar.dayLabel"
  | "calendar.multiSelect"
  | "calendar.selectDay"
  | "calendar.back"
  | "calendar.next"
  | "calendar.today"
  | "calendar.busiest"
  | "calendar.selectHint"
  | "delete.title"
  | "delete.body"
  | "delete.bodyOne"
  | "delete.done"
  | "delete.confirm"
  | "report.title"
  | "report.subtitle"
  | "report.topCategory"
  | "report.byCategory"
  | "report.byDay"
  | "report.split"
  | "report.categoriesUsed"
  | "report.budget"
  | "report.overBudget"
  | "report.noBudget"
  | "report.noData"
  | "report.share"
  | "report.copied"
  | "report.busiestDay"
  | "report.quietestDay"
  | "report.bySource"
  | "report.ofIncome"
  | "report.ofTotal"
  | "report.totalSpent"
  | "report.totalIncome"
  | "report.net"
  | "report.average"
  | "report.entries"
  | "report.incomeEntries"
  | "report.noIncome"
  | "report.budgetLeft"
  | "report.incomeBrokeEven"
  | "history.title"
  | "history.subtitle"
  | "history.empty"
  | "history.emptyHint"
  | "history.addExpense"
  | "history.addIncome"
  | "history.incomeFallback"
  | "history.count"
  | "common.today"
  | "common.add"
  | "common.cancel"
  | "common.save"
  | "common.delete"
  | "common.viewAll"
  | "common.manage"
  | "common.rename"
  | "common.name"
  | "common.addCategory"
  | "settings.title"
  | "settings.subtitle"
  | "settings.language"
  | "settings.languageHint"
  | "settings.appearance"
  | "settings.appearance.light"
  | "settings.appearance.dark"
  | "settings.appearanceHint"
  | "settings.mobileMoney"
  | "settings.mobileMoney.linked"
  | "settings.mobileMoney.notLinked"
  | "settings.mobileMoneyHint"
  | "settings.account"
  | "settings.signedInAs"
  | "settings.guest"
  | "settings.guestHint"
  | "settings.signIn"
  | "settings.signOut"
  | "settings.data"
  | "settings.syncStatus"
  | "settings.backup"
  | "settings.storage"
  | "settings.storageValue"
  | "settings.clearData"
  | "settings.clearTitle"
  | "settings.clearBody"
  | "settings.clearConfirm"
  | "settings.aboutTitle"
  | "settings.aboutBody"
  | "category.added"
  | "category.updated"
  | "category.deleted"
  | "category.rename"
  | "category.deleteHint"
  | "category.namePlaceholder"
  | "footer.copyright"
  | "footer.license"
  | "footer.madeIn"
  | "footer.note"
  | "auth.title"
  | "auth.subtitle"
  | "auth.emailLabel"
  | "auth.emailPlaceholder"
  | "auth.errorEmail"
  | "auth.continue"
  | "auth.or"
  | "auth.guest"
  | "auth.verifyTitle"
  | "auth.verifySubtitle"
  | "auth.useDifferent"
  | "auth.verifying"
  | "auth.verify"
  | "auth.securedBy"
  | "auth.backHome"
  | "auth.errorCode"
  | "settings.cleared"
  | "home.thisMonth"
  | "entry.expense"
  | "entry.income"
  | "calendar.cancel"
  | "category.food"
  | "category.transport"
  | "category.housing"
  | "category.shopping"
  | "category.health"
  | "category.family"
  | "category.education"
  | "category.bills"
  | "category.leisure"
  | "category.other"
  | "nav.calendar"
  | "nav.report"
  | "nav.settings"
  | "nav.home"
  | "nav.history";

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "mg", label: "Malagasy" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "de", label: "Deutsch" },
] as const;

const dictionaries = {
  en: {
    "app.name": "Trust Us",
    "app.tagline": "Wallet expenses, finally accounted for.",
    "app.currency": "MGA",
    "app.slogan": "No curves, just numbers.",
    "app.month": "Month",
    "landing.title": "Your wallet, finally at home",
    "landing.subtitle": "Trust Us is a notebook for Malagasy wallets. Enter an expense in seconds, browse the calendar, and read a clear statement — online or fully offline.",
    "landing.trustLine": "No card needed · Data stays on your device first",
    "landing.badge": "Trusted, not trendy",
    "landing.featuresTitle": "Built for the way money really moves",
    "landing.featuresSubtitle": "Six things done right, so your balance finally matches reality.",
    "landing.stepsTitle": "From receipt to statement in three steps",
    "landing.step1.title": "Enter",
    "landing.step1.body": "Amount in Ariary, a category, an optional note. About five seconds.",
    "landing.step2.title": "Read the calendar",
    "landing.step2.body": "Pricey days stand out immediately, so you can act on them while the month is still ahead.",
    "landing.step3.title": "Close the month",
    "landing.step3.body": "Open the statement, compare it with your budget, and take the lesson with you.",
    "landing.stats.languages": "Languages",
    "landing.stats.currency": "Currency",
    "landing.stats.storage": "Storage",
    "landing.stats.storageValue": "Device + cloud",
    "landing.stats.sync": "Offline mode",
    "landing.stats.syncValue": "Always active",
    "landing.footerRights": "Trust Us. For expenses you trust.",
    "landing.mock.balance": "Total balance",
    "landing.mock.card": "Debit wallet",
    "landing.mock.quick": "Quick add",
    "landing.mock.recent": "Last bookings",
    "landing.mock.calendar": "Calendar",
    "landing.mock.statement": "Statement",
    "landing.mock.income": "Income",
    "landing.mock.expenses": "Expenses",
    "landing.primaryCta": "Start tracking",
    "landing.secondaryCta": "See how it works",
    "landing.feature.calendar.title": "Expense calendar",
    "landing.feature.calendar.body": "Each day shows its total. Tap a day to see the receipts behind it.",
    "landing.feature.report.title": "Detailed statement",
    "landing.feature.report.body": "Month totals, daily rhythm, and a category breakdown with budget comparison.",
    "landing.feature.auth.title": "User accounts",
    "landing.feature.auth.body": "Sign in with an email code, or keep going as a guest — the notebook is yours either way.",
    "landing.feature.sync.title": "Local only",
    "landing.feature.sync.body": "Every entry is saved on this device only — nothing is uploaded anywhere.",
    "landing.feature.multi.title": "Clean spanning days",
    "landing.feature.multi.body": "Select several days, review the count, and delete only after confirmation.",
    "landing.feature.language.title": "Five languages",
    "landing.feature.language.body": "English by default, plus Malagasy, French, Italian and German.",
    "home.welcomeBack": "Welcome back",
    "home.guestName": "Guest wallet",
    "home.totalBalance": "Total balance",
    "home.monthSpend": "Spent in {month}",
    "home.entries": "{count} entries",
    "home.recent": "Last bookings",
    "home.empty": "Nothing recorded yet",
    "home.emptyHint": "Add your first expense — it is stored on this device first.",
    "home.quickAdd": "Quick add",
    "home.todaySpend": "Today's spend",
    "home.balanceHidden": "Balance hidden",
    "home.showBalance": "Show balance",
    "home.hideBalance": "Hide balance",
    "home.budgetLeft": "Budget left",
    "home.topCategory": "Biggest category",
    "home.sync.synced": "Synced with your account",
    "home.sync.syncing": "Syncing…",
    "home.sync.local": "Saved on this device",
    "home.sync.signIn": "Sign in to sync",
    "expense.newTitle": "New expense",
    "expense.editTitle": "Edit expense",
    "expense.amount": "Amount (MGA)",
    "expense.description": "Note",
    "expense.category": "Category",
    "expense.date": "Date",
    "expense.dateHint": "Pick the day the money left you",
    "expense.invalidAmount": "Enter an amount greater than zero.",
    "expense.pickDates": "Pick dates",
    "expense.dates": "Dates",
    "expense.datesSelected": "{count} selected",
    "expense.descriptionPlaceholder": "Souvenir Antananarivo",
    "expense.added": "Expense added",
    "expense.updated": "Expense updated",
    "expense.manageCategories": "Manage categories",
    "expense.categoryDone": "Categories done",
    "expense.addTitle": "New expense",
    "income.amount": "Amount",
    "income.description": "Note",
    "income.descriptionPlaceholder": "Souvenir Antananarivo",
    "income.source": "Source",
    "income.sourcePlaceholder": "Phone credit",
    "income.date": "Date",
    "income.time": "Time",
    "income.timePlaceholder": "14:30",
    "income.invalidAmount": "Enter an amount greater than zero.",
    "income.added": "Income added",
    "income.subtitle": "Money that came in. Add it in one tap.",
    "income.history": "Recent income",
    "income.historyHint": "Money already recorded for this month.",
    "income.historyEmpty": "Nothing yet. Add your first income.",
    "income.delete": "Delete income",
    "calendar.title": "Expense calendar",
    "calendar.subtitle": "Pick a day to review, or several days to clean up.",
    "calendar.selected": "{count} days selected",
    "calendar.selectedOne": "1 day selected",
    "calendar.clearSelection": "Clear selection",
    "calendar.deleteSelected": "Delete selected days",
    "calendar.dayTotal": "{count} expenses · {total}",
    "calendar.noExpenses": "Nothing recorded for this day.",
    "calendar.dayListTitle": "Expenses of the selected day",
    "calendar.dayLabel": "Day",
    "calendar.multiSelect": "Multi select",
    "calendar.selectDay": "Select this day",
    "calendar.back": "Back",
    "calendar.next": "Next",
    "calendar.today": "Today",
    "calendar.busiest": "Busiest",
    "calendar.selectHint": "Select a day to see its receipts",
    "delete.title": "Delete",
    "delete.body": "{count} expenses are permanently removed from this device and your account. This cannot be undone.",
    "delete.bodyOne": "1 expense is permanently removed from this device and your account. This cannot be undone.",
    "delete.done": "Expenses deleted",
    "delete.confirm": "Delete",
    "report.title": "Detailed statement",
    "report.subtitle": "Everything you spent, sorted by category and day.",
    "report.topCategory": "Biggest category",
    "report.byCategory": "By category",
    "report.byDay": "Daily rhythm",
    "report.split": "Category split",
    "report.categoriesUsed": "Categories used",
    "report.budget": "Budget",
    "report.overBudget": "{amount} over budget",
    "report.noBudget": "No budget set",
    "report.noData": "Nothing recorded in this period.",
    "report.share": "Copy statement",
    "report.copied": "Statement copied",
    "report.busiestDay": "Most expensive day",
    "report.quietestDay": "Quietest day",
    "report.bySource": "Income by source",
    "report.ofIncome": "{percent}% of income",
    "report.ofTotal": "{percent}% of total",
    "report.totalSpent": "Total spent",
    "report.totalIncome": "Total income",
    "report.net": "Net",
    "report.average": "Average",
    "report.entries": "Entries",
    "report.incomeEntries": "Income entries",
    "report.noIncome": "No income yet",
    "report.budgetLeft": "Budget left",
    "report.incomeBrokeEven": "Break-even",
    "history.title": "History",
    "history.subtitle": "Every entry, in the order it happened.",
    "history.empty": "Nothing recorded yet",
    "history.emptyHint": "Add an expense or income — each entry keeps its date and time here.",
    "history.addExpense": "Add expense",
    "history.addIncome": "Add income",
    "history.incomeFallback": "Income",
    "history.count": "{count} entries total",
    "common.today": "Today",
    "common.add": "Add",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.viewAll": "View all",
    "common.manage": "Manage",
    "common.rename": "Rename",
    "common.name": "Name",
    "common.addCategory": "Add category",
    "settings.title": "Settings",
    "settings.subtitle": "Everything you need to keep the notebook yours.",
    "settings.language": "Language",
    "settings.languageHint": "English is the default. Changes apply immediately.",
    "settings.appearance": "Appearance",
    "settings.appearance.light": "Light",
    "settings.appearance.dark": "Dark",
    "settings.appearanceHint": "Choose how the notebook looks on your screen.",
    "settings.mobileMoney": "Mobile money",
    "settings.mobileMoney.linked": "Linked",
    "settings.mobileMoney.notLinked": "Not linked",
    "settings.mobileMoneyHint": "Link your mobile money provider to receive transfers here.",
    "settings.account": "Account",
    "settings.signedInAs": "Signed in as {name}",
    "settings.guest": "Guest session",
    "settings.guestHint": "Your data lives on this device. Sign in to mirror it to your account.",
    "settings.signIn": "Sign in / create account",
    "settings.signOut": "Sign out",
    "settings.data": "Data",
    "settings.syncStatus": "Sync status",
    "settings.backup": "Backup",
    "settings.storage": "On this device",
    "settings.storageValue": "{count} expenses stored locally",
    "settings.clearData": "Delete all local data",
    "settings.clearTitle": "Delete all local data?",
    "settings.clearBody": "{count} expenses will be removed from this device and your account.",
    "settings.clearConfirm": "Delete all",
    "settings.aboutTitle": "About",
    "settings.aboutBody": "Trust Us tracks expenses in Malagasy ariary (MGA) with a coffee-and-roast interface: no curves, just numbers.",
    "category.added": "Category added",
    "category.updated": "Category updated",
    "category.deleted": "Category deleted",
    "category.rename": "Rename category",
    "category.deleteHint": "Delete category",
    "category.food": "Food",
    "category.transport": "Transport",
    "category.housing": "Housing",
    "category.shopping": "Shopping",
    "category.health": "Health",
    "category.family": "Family",
    "category.education": "Education",
    "category.bills": "Bills",
    "category.leisure": "Leisure",
    "category.other": "Other",
    "category.namePlaceholder": "New category name",
    "footer.copyright": "© 2026 Alex Noah RANDRIANARISOA. All rights reserved.",
    "footer.license": "MIT License",
    "footer.madeIn": "Made in Madagascar",
    "footer.note": "For expenses you can actually trust.",
    "auth.title": "Welcome to Trust Us",
    "auth.subtitle": "Sign in with your email code, or keep going as a guest.",
    "auth.emailLabel": "Email",
    "auth.emailPlaceholder": "you@domain.com",
    "auth.errorEmail": "Enter a valid email address.",
    "auth.continue": "Continue",
    "auth.or": "or",
    "auth.guest": "Keep going as guest",
    "auth.verifyTitle": "Verify your email",
    "auth.verifySubtitle": "We sent a code to {email}. Enter it below.",
    "auth.useDifferent": "Use a different email",
    "auth.verifying": "Verifying…",
    "auth.verify": "Verify",
    "auth.securedBy": "Secured by email magic links.",
    "auth.backHome": "Back home",
    "auth.errorCode": "Wrong code. Try again.",
    "settings.cleared": "Data cleared",
    "home.thisMonth": "This month",
    "entry.expense": "Expense",
    "entry.income": "Income",
    "calendar.cancel": "Cancel",
    "nav.home": "Home",
    "nav.calendar": "Calendar",
    "nav.report": "Statement",
    "nav.settings": "Settings",
    "nav.history": "History",
  },
  mg: {
    "app.name": "Trust Us",
    "app.tagline": "Ny fandaniana eo amin'ny poketra, voatanisa amin'ny farany.",
    "app.currency": "MGA",
    "app.slogan": "Tsy misy sary, ny isa ihany.",
    "app.month": "Volana",
    "landing.title": "Ny poketrao, tonga any an-tranony",
    "landing.subtitle": "Trust Us dia kahie ho an'ny poketra malagasy. Ampidiro ao anatin'ny segondra vitsy ny fandaniana, jereo ny kalandrie, ary vakio ny tatitra mazava — an-tserasera na tsy misy internet.",
    "landing.trustLine": "Tsy mila karatra · Mijanona ao amin'ny fitaovanao aloha ny angona",
    "landing.badge": "Azo itokisana, tsy lamaody",
    "landing.featuresTitle": "Natao araka ny fivezivezen'ny vola tena izy",
    "landing.featuresSubtitle": "Zavatra enina natao tsara, mba hifanaraka amin'ny tena izy ny fifandanjanao.",
    "landing.stepsTitle": "Avy amin'ny tapakila ka hatramin'ny tatitra, dingana telo",
    "landing.step1.title": "Ampidiro",
    "landing.step1.body": "Vola Ariary, sokajy iray, fanamarihana raha ilaina. Tokony ho dimy segondra.",
    "landing.step2.title": "Vakio ny kalandrie",
    "landing.step2.body": "Hita avy hatrany ny andro lafo, ka afaka miasa ianao raha mbola tsy tapitra ny volana.",
    "landing.step3.title": "Farano ny volana",
    "landing.step3.body": "Sokafy ny tatitra, ampitahao amin'ny tetibola, ary ento miaraka aminao ny lesona.",
    "landing.stats.languages": "Fiteny",
    "landing.stats.currency": "Vola",
    "landing.stats.storage": "Fitehirizana",
    "landing.stats.storageValue": "Fitaovana + rahona",
    "landing.stats.sync": "Fomba tsy an-tserasera",
    "landing.stats.syncValue": "Mavitrika lalandava",
    "landing.footerRights": "Trust Us. Ho an'ny fandaniana itokisanao.",
    "landing.mock.balance": "Fitambaran'ny vola",
    "landing.mock.card": "Poketra debit",
    "landing.mock.quick": "Fanampiny haingana",
    "landing.mock.recent": "Fandanianana farany",
    "landing.mock.calendar": "Kalandrie",
    "landing.mock.statement": "Tatitra",
    "landing.mock.income": "Tombony",
    "landing.mock.expenses": "Fandaniana",
    "landing.primaryCta": "Atombohy ny fanaraha-maso",
    "landing.secondaryCta": "Jereo ny fomba fiasany",
    "landing.feature.calendar.title": "Kalandrie fandaniana",
    "landing.feature.calendar.body": "Ny andro tsirairay dia mampiseho ny fitambarany. Tsindrio ny andro iray hahitana ny tapakila ao aorany.",
    "landing.feature.report.title": "Tatitra amin'ny antsipiriany",
    "landing.feature.report.body": "Fitambaran'ny volana, ritmon'ny andro, ary fizarana sokajy miaraka amin'ny fampitahana tetibola.",
    "landing.feature.auth.title": "Kaonty mpampiasa",
    "landing.feature.auth.body": "Midira amin'ny kaody mailaka, na tohizo ho vahiny — anao ihany ny kahie na manao ahoana na manao ahoana.",
    "auth.backHome": "Hiverina any an-trano",
    "auth.errorCode": "Diso ny kaody. Andramo indray.",
    "settings.cleared": "Voafafa ny angona",
    "home.thisMonth": "Ity volana ity",
    "entry.expense": "Fandaniana",
    "entry.income": "Tombony",
    "calendar.cancel": "Ajanona",
    "landing.feature.sync.title": "Eto an-toerana ihany",
    "landing.feature.sync.body": "Voatahiry ao amin'ity fitaovana ity ihany ny fidirana rehetra, tsy misy alefa any an-tserasera.",
    "landing.feature.multi.title": "Andro maromaro voafidy",
    "landing.feature.multi.body": "Fidio andro maromaro, jereo ny isany, ary fafao rehefa voamarina.",
    "landing.feature.language.title": "Fiteny dimy",
    "landing.feature.language.body":
      "Anglisy amin'ny voalohany, miampy Malagasy, Frantsay, Italiana ary Alemanina.",
    "home.welcomeBack": "Tongasoa indray",
    "home.guestName": "Poketra vahiny",
    "home.totalBalance": "Fitambaran'ny vola",
    "home.monthSpend": "Lany tamin'ny {month}",
    "home.entries": "Fidirana {count}",
    "home.recent": "Fandanianana farany",
    "home.empty": "Mbola tsy misy voarakitra",
    "home.emptyHint": "Ampio ny fandaniana voalohany — tehirizina ao amin'ity fitaovana ity aloha izy.",
    "home.quickAdd": "Fanampiny haingana",
    "home.todaySpend": "Lany androany",
    "home.balanceHidden": "Nafenina ny fifandanjana",
    "home.showBalance": "Asehoy ny fifandanjana",
    "home.hideBalance": "Afeno ny fifandanjana",
    "home.budgetLeft": "Tetibola sisa",
    "home.topCategory": "Sokajy lehibe indrindra",
    "home.sync.synced": "Mifanaraka amin'ny kaontinao",
    "home.sync.syncing": "Mifanaraka…",
    "home.sync.local": "Voatahiry eto amin'ity fitaovana ity",
    "home.sync.signIn": "Midira mba hifanaraka",
    "expense.newTitle": "Fandaniana vaovao",
    "expense.editTitle": "Hanova fandaniana",
    "expense.amount": "Vola (MGA)",
    "expense.description": "Fanamarihana",
    "expense.category": "Sokajy",
    "expense.date": "Daty",
    "expense.dateHint": "Fidio ny andro nialan'ny vola",
    "expense.invalidAmount": "Ampidiro vola mihoatra ny aotra.",
    "expense.pickDates": "Fidio daty",
    "expense.dates": "Daty",
    "expense.datesSelected": "{count} voafidy",
    "expense.descriptionPlaceholder": "Fahatsiarovana Antananarivo",
    "expense.added": "Voampiditra ny fandaniana",
    "expense.updated": "Novaina ny fandaniana",
    "expense.manageCategories": "Tantano ny sokajy",
    "expense.categoryDone": "Vita ny sokajy",
    "expense.addTitle": "Fandaniana vaovao",
    "income.amount": "Vola",
    "income.description": "Fanamarihana",
    "income.descriptionPlaceholder": "Fahatsiarovana Antananarivo",
    "income.source": "Loharano",
    "income.sourcePlaceholder": "Vola finday",
    "income.date": "Daty",
    "income.time": "Ora",
    "income.timePlaceholder": "14:30",
    "income.invalidAmount": "Ampidiro vola mihoatra ny aotra.",
    "income.added": "Voampiditra ny tombony",
    "income.subtitle": "Vola niditra. Ampidiro amin'ny tsindry iray.",
    "income.history": "Tombony farany",
    "income.historyHint": "Vola efa voarakitra ho an'ity volana ity.",
    "income.historyEmpty": "Mbola tsy misy. Ampidiro ny tombony voalohany.",
    "income.delete": "Fafao ny tombony",
    "calendar.title": "Kalandrie fandaniana",
    "calendar.subtitle": "Fidio andro iray hojerena, na andro maromaro hodiovana.",
    "calendar.selected": "{count} andro voafidy",
    "calendar.selectedOne": "1 andro voafidy",
    "calendar.clearSelection": "Fafao ny safidy",
    "calendar.deleteSelected": "Fafao ireo andro voafidy",
    "calendar.dayTotal": "{count} fandaniana · {total}",
    "calendar.noExpenses": "Tsy misy voarakitra amin'ity andro ity.",
    "calendar.dayListTitle": "Fandaniana amin'ny andro voafidy",
    "calendar.dayLabel": "Andro",
    "calendar.multiSelect": "Safidy maromaro",
    "calendar.selectDay": "Fidio ity andro ity",
    "calendar.back": "Hiverina",
    "calendar.next": "Manaraka",
    "calendar.today": "Androany",
    "calendar.busiest": "Be indrindra",
    "calendar.selectHint": "Fidio andro iray hahitana ny tapakilany",
    "delete.title": "Fafana",
    "delete.body": "{count} fandaniana no fafana tanteraka amin'ity fitaovana ity sy amin'ny kaontinao. Tsy azo averina izany.",
    "delete.bodyOne": "Fandaniana 1 no fafana tanteraka amin'ity fitaovana ity sy amin'ny kaontinao. Tsy azo averina izany.",
    "delete.done": "Voafafa ny fandaniana",
    "delete.confirm": "Fafao",
    "report.title": "Tatitra amin'ny antsipiriany",
    "report.subtitle": "Izay rehetra lany, voarindra araka ny sokajy sy ny andro.",
    "report.topCategory": "Sokajy lehibe indrindra",
    "report.byCategory": "Araka ny sokajy",
    "report.byDay": "Ritmon'ny andro",
    "report.split": "Fizarana araka ny sokajy",
    "report.categoriesUsed": "Sokajy ampiasaina",
    "report.budget": "Tetibola",
    "report.overBudget": "Mihoatra ny tetibola {amount}",
    "report.noBudget": "Tsy misy tetibola voafaritra",
    "report.noData": "Tsy misy voarakitra amin'ity vanim-potoana ity.",
    "report.share": "Adikao ny tatitra",
    "report.copied": "Voavadika ny tatitra",
    "report.busiestDay": "Andro lafo indrindra",
    "report.quietestDay": "Andro mangina indrindra",
    "report.bySource": "Tombony araka ny loharano",
    "report.ofIncome": "{percent}% amin'ny tombony",
    "report.ofTotal": "{percent}% amin'ny fitambarany",
    "report.totalSpent": "Fitambaran'ny lany",
    "report.totalIncome": "Fitambaran'ny tombony",
    "report.net": "Sisa",
    "report.average": "Salany",
    "report.entries": "Fidirana",
    "report.incomeEntries": "Fidiran'ny tombony",
    "report.noIncome": "Mbola tsy misy tombony",
    "report.budgetLeft": "Tetibola sisa",
    "report.incomeBrokeEven": "Mitovy ny lany sy ny tombony",
    "history.title": "Tantara",
    "history.subtitle": "Ny fidirana rehetra, araka ny filaharan'ny nitrangan'izany.",
    "history.empty": "Mbola tsy misy voarakitra",
    "history.emptyHint": "Ampio fandaniana na tombony — voatahiry eto ny daty sy ny oran'ny tsirairay.",
    "history.addExpense": "Hanampy fandaniana",
    "history.addIncome": "Hanampy tombony",
    "history.incomeFallback": "Tombony",
    "history.count": "Fidirana {count} amin'ny fitambarany",
    "common.today": "Androany",
    "common.add": "Hanampy",
    "common.cancel": "Ajanona",
    "common.save": "Tehirizo",
    "common.delete": "Fafao",
    "common.viewAll": "Jereo daholo",
    "common.manage": "Tantano",
    "common.rename": "Ovay anarana",
    "common.name": "Anarana",
    "common.addCategory": "Hanampy sokajy",
    "settings.title": "Fandaharana",
    "settings.subtitle": "Izay rehetra ilaina mba hitazonana ny kahie ho anao.",
    "settings.language": "Fiteny",
    "settings.languageHint": "Anglisy no voalohany. Mihatra avy hatrany ny fanovana.",
    "settings.appearance": "Endrika",
    "settings.appearance.light": "Mazava",
    "settings.appearance.dark": "Maizina",
    "settings.appearanceHint": "Fidio ny endrik'ity kahie ity eo amin'ny efijery.",
    "settings.mobileMoney": "Vola finday",
    "settings.mobileMoney.linked": "Mifandray",
    "settings.mobileMoney.notLinked": "Tsy mifandray",
    "settings.mobileMoneyHint": "Ampifandraiso ny mpamatsy vola finday raha handray famindrana eto.",
    "settings.account": "Kaonty",
    "settings.signedInAs": "Miditra amin'ny anaran'i {name}",
    "settings.guest": "Seansa vahiny",
    "settings.guestHint": "Eto amin'ity fitaovana ity ny angoninao. Midira mba hifanaraka amin'ny kaontinao izy.",
    "settings.signIn": "Midira / hamorona kaonty",
    "settings.signOut": "Hiala",
    "settings.data": "Angona",
    "settings.syncStatus": "Toe-javatra fifanarahana",
    "settings.backup": "Fitehirizana",
    "settings.storage": "Eto amin'ity fitaovana ity",
    "settings.storageValue": "{count} fandaniana voatahiry eto an-toerana",
    "settings.clearData": "Fafao daholo ny angona eto an-toerana",
    "settings.clearTitle": "Fafao daholo ny angona eto an-toerana?",
    "settings.clearBody": "{count} fandaniana no hesorina amin'ity fitaovana ity sy amin'ny kaontinao.",
    "settings.clearConfirm": "Fafao daholo",
    "settings.aboutTitle": "Momba",
    "settings.aboutBody": "Manara-maso ny fandaniana amin'ny Ariary (MGA) i Trust Us, miaraka amin'ny endrika kafe sy mofomamy: tsy misy sary, ny isa ihany.",
    "category.added": "Voampiditra ny sokajy",
    "category.updated": "Novaina ny sokajy",
    "category.deleted": "Voafafa ny sokajy",
    "category.rename": "Ovay anarana ny sokajy",
    "category.deleteHint": "Fafao ny sokajy",
    "category.food": "Sakafo",
    "category.transport": "Fitaterana",
    "category.housing": "Trano",
    "category.shopping": "Fividianana",
    "category.health": "Fahasalamana",
    "category.family": "Fianakaviana",
    "category.education": "Fanabeazana",
    "category.bills": "Vola aloa",
    "category.leisure": "Fialam-boly",
    "category.other": "Hafa",
    "category.namePlaceholder": "Anaran'ny sokajy vaovao",
    "footer.copyright": "© 2026 Alex Noah RANDRIANARISOA. Zo rehetra voatokana.",
    "footer.license": "Fahazoan-dalana MIT",
    "footer.madeIn": "Natao tany Madagasikara",
    "footer.note": "Ho an'ny fandaniana azo itokisana marina.",
    "auth.title": "Tongasoa eto amin'ny Trust Us",
    "auth.subtitle": "Midira amin'ny kaody mailakao, na tohizo ho vahiny.",
    "auth.emailLabel": "Mailaka",
    "auth.emailPlaceholder": "ianao@domain.com",
    "auth.errorEmail": "Ampidiro adiresy mailaka marina.",
    "auth.continue": "Hanohy",
    "auth.or": "na",
    "auth.guest": "Tohizo ho vahiny",
    "auth.verifyTitle": "Hamarinio ny mailakao",
    "auth.verifySubtitle": "Nandefa kaody tany amin'i {email} izahay. Ampidiro etsy ambany.",
    "auth.useDifferent": "Hampiasa mailaka hafa",
    "auth.verifying": "Manamarina…",
    "auth.verify": "Hamarinio",
    "auth.securedBy": "Voaro amin'ny rohy majika mailaka.",
    "nav.home": "Fandraisana",
    "nav.calendar": "Kalandrie",
    "nav.report": "Tatitra",
    "nav.settings": "Fandaharana",
    "nav.history": "Tantara",
  },
  fr: {
    "app.name": "Trust Us",
    "app.tagline": "Les dépenses du portefeuille, enfin comptabilisées.",
    "app.currency": "MGA",
    "app.slogan": "Pas de courbes, que des chiffres.",
    "app.month": "Mois",
    "landing.title": "Votre portefeuille, enfin chez vous",
    "landing.subtitle":
      "Trust Us est un carnet pour les portefeuilles malgaches. Saisissez une dépense en quelques secondes, parcourez le calendrier et lisez un relevé clair — en ligne ou entièrement hors ligne.",
    "landing.trustLine": "Aucune carte nécessaire · Vos données restent d'abord sur votre appareil",
    "landing.badge": "Fiable, pas à la mode",
    "landing.featuresTitle": "Conçu pour la façon dont l'argent circule vraiment",
    "landing.featuresSubtitle":
      "Six choses bien faites, pour que votre solde corresponde enfin à la réalité.",
    "landing.stepsTitle": "Du ticket au relevé en trois étapes",
    "landing.step1.title": "Saisir",
    "landing.step1.body": "Un montant en Ariary, une catégorie, une note optionnelle. Environ cinq secondes.",
    "landing.step2.title": "Lire le calendrier",
    "landing.step2.body":
      "Les jours coûteux se détachent immédiatement, pour agir pendant que le mois est encore devant vous.",
    "landing.step3.title": "Clôturer le mois",
    "landing.step3.body": "Ouvrez le relevé, comparez-le à votre budget et gardez la leçon avec vous.",
    "landing.stats.languages": "Langues",
    "landing.stats.currency": "Devise",
    "landing.stats.storage": "Stockage",
    "landing.stats.storageValue": "Appareil + cloud",
    "landing.stats.sync": "Mode hors ligne",
    "landing.stats.syncValue": "Toujours actif",
    "landing.footerRights": "Trust Us. Pour des dépenses auxquelles vous faites confiance.",
    "landing.mock.balance": "Solde total",
    "landing.mock.card": "Portefeuille débité",
    "landing.mock.quick": "Ajout rapide",
    "landing.mock.recent": "Dernières écritures",
    "landing.mock.calendar": "Calendrier",
    "landing.mock.statement": "Relevé",
    "landing.mock.income": "Revenus",
    "landing.mock.expenses": "Dépenses",
    "landing.primaryCta": "Commencer le suivi",
    "landing.secondaryCta": "Voir comment ça marche",
    "landing.feature.calendar.title": "Calendrier des dépenses",
    "landing.feature.calendar.body":
      "Chaque jour affiche son total. Touchez un jour pour voir les tickets qu'il contient.",
    "landing.feature.report.title": "Relevé détaillé",
    "landing.feature.report.body":
      "Totaux mensuels, rythme quotidien et répartition par catégorie avec comparaison du budget.",
    "landing.feature.auth.title": "Comptes utilisateurs",
    "landing.feature.auth.body":
      "Connectez-vous avec un code e-mail, ou continuez en invité — le carnet vous appartient dans les deux cas.",
    "landing.feature.sync.title": "Uniquement local",
    "landing.feature.sync.body":
      "Chaque écriture est enregistrée sur cet appareil uniquement — rien n'est envoyé en ligne.",
    "landing.feature.multi.title": "Nettoyage sur plusieurs jours",
    "landing.feature.multi.body":
      "Sélectionnez plusieurs jours, vérifiez le nombre et supprimez uniquement après confirmation.",
    "landing.feature.language.title": "Cinq langues",
    "landing.feature.language.body":
      "L'anglais par défaut, plus le malgache, le français, l'italien et l'allemand.",
    "home.welcomeBack": "Bon retour",
    "home.guestName": "Portefeuille invité",
    "home.totalBalance": "Solde total",
    "home.monthSpend": "Dépensé en {month}",
    "home.entries": "{count} écritures",
    "home.recent": "Dernières écritures",
    "home.empty": "Rien d'enregistré pour l'instant",
    "home.emptyHint":
      "Ajoutez votre première dépense — elle est d'abord enregistrée sur cet appareil.",
    "home.quickAdd": "Ajout rapide",
    "home.todaySpend": "Dépenses du jour",
    "home.balanceHidden": "Solde masqué",
    "home.showBalance": "Afficher le solde",
    "home.hideBalance": "Masquer le solde",
    "home.budgetLeft": "Budget restant",
    "home.topCategory": "Catégorie principale",
    "home.sync.synced": "Synchronisé avec votre compte",
    "home.sync.syncing": "Synchronisation…",
    "home.sync.local": "Enregistré sur cet appareil",
    "home.sync.signIn": "Connectez-vous pour synchroniser",
    "expense.newTitle": "Nouvelle dépense",
    "expense.editTitle": "Modifier la dépense",
    "expense.amount": "Montant (MGA)",
    "expense.description": "Note",
    "expense.category": "Catégorie",
    "expense.date": "Date",
    "expense.dateHint": "Choisissez le jour où l'argent vous a quitté",
    "expense.invalidAmount": "Saisissez un montant supérieur à zéro.",
    "expense.pickDates": "Choisir des dates",
    "expense.dates": "Dates",
    "expense.datesSelected": "{count} sélectionné(s)",
    "expense.descriptionPlaceholder": "Souvenir Antananarivo",
    "expense.added": "Dépense ajoutée",
    "expense.updated": "Dépense mise à jour",
    "expense.manageCategories": "Gérer les catégories",
    "expense.categoryDone": "Catégories terminées",
    "expense.addTitle": "Nouvelle dépense",
    "income.amount": "Montant",
    "income.description": "Note",
    "income.descriptionPlaceholder": "Souvenir Antananarivo",
    "income.source": "Source",
    "income.sourcePlaceholder": "Crédit téléphonique",
    "income.date": "Date",
    "income.time": "Heure",
    "income.timePlaceholder": "14:30",
    "income.invalidAmount": "Saisissez un montant supérieur à zéro.",
    "income.added": "Revenu ajouté",
    "income.subtitle": "L'argent qui est entré. Ajoutez-le en un geste.",
    "income.history": "Revenus récents",
    "income.historyHint": "Argent déjà enregistré pour ce mois.",
    "income.historyEmpty": "Rien pour l'instant. Ajoutez votre premier revenu.",
    "income.delete": "Supprimer le revenu",
    "calendar.title": "Calendrier des dépenses",
    "calendar.subtitle": "Choisissez un jour à consulter, ou plusieurs jours à nettoyer.",
    "calendar.selected": "{count} jours sélectionnés",
    "calendar.selectedOne": "1 jour sélectionné",
    "calendar.clearSelection": "Effacer la sélection",
    "calendar.deleteSelected": "Supprimer les jours sélectionnés",
    "calendar.dayTotal": "{count} dépenses · {total}",
    "calendar.noExpenses": "Rien d'enregistré pour ce jour.",
    "calendar.dayListTitle": "Dépenses du jour sélectionné",
    "calendar.dayLabel": "Jour",
    "calendar.multiSelect": "Sélection multiple",
    "calendar.selectDay": "Sélectionner ce jour",
    "calendar.back": "Précédent",
    "calendar.next": "Suivant",
    "calendar.today": "Aujourd'hui",
    "calendar.busiest": "Le plus chargé",
    "calendar.selectHint": "Sélectionnez un jour pour voir ses tickets",
    "delete.title": "Supprimer",
    "delete.body":
      "{count} dépenses seront définitivement supprimées de cet appareil et de votre compte. Cette action est irréversible.",
    "delete.bodyOne":
      "1 dépense sera définitivement supprimée de cet appareil et de votre compte. Cette action est irréversible.",
    "delete.done": "Dépenses supprimées",
    "delete.confirm": "Supprimer",
    "report.title": "Relevé détaillé",
    "report.subtitle": "Tout ce que vous avez dépensé, trié par catégorie et par jour.",
    "report.topCategory": "Catégorie principale",
    "report.byCategory": "Par catégorie",
    "report.byDay": "Rythme quotidien",
    "report.split": "Répartition par catégorie",
    "report.categoriesUsed": "Catégories utilisées",
    "report.budget": "Budget",
    "report.overBudget": "{amount} au-dessus du budget",
    "report.noBudget": "Aucun budget défini",
    "report.noData": "Rien d'enregistré sur cette période.",
    "report.share": "Copier le relevé",
    "report.copied": "Relevé copié",
    "report.busiestDay": "Jour le plus dépensier",
    "report.quietestDay": "Jour le plus calme",
    "report.bySource": "Revenus par source",
    "report.ofIncome": "{percent}% des revenus",
    "report.ofTotal": "{percent}% du total",
    "report.totalSpent": "Total dépensé",
    "report.totalIncome": "Revenus totaux",
    "report.net": "Net",
    "report.average": "Moyenne",
    "report.entries": "Écritures",
    "report.incomeEntries": "Écritures de revenus",
    "report.noIncome": "Aucun revenu pour l'instant",
    "report.budgetLeft": "Budget restant",
    "report.incomeBrokeEven": "Équilibre atteint",
    "history.title": "Historique",
    "history.subtitle": "Chaque écriture, dans l'ordre où elle est arrivée.",
    "history.empty": "Rien d'enregistré pour l'instant",
    "history.emptyHint":
      "Ajoutez une dépense ou un revenu — chaque écriture garde sa date et son heure ici.",
    "history.addExpense": "Ajouter une dépense",
    "history.addIncome": "Ajouter un revenu",
    "history.incomeFallback": "Revenu",
    "history.count": "{count} écritures au total",
    "common.today": "Aujourd'hui",
    "common.add": "Ajouter",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "common.delete": "Supprimer",
    "common.viewAll": "Tout voir",
    "common.manage": "Gérer",
    "common.rename": "Renommer",
    "common.name": "Nom",
    "common.addCategory": "Ajouter une catégorie",
    "settings.title": "Paramètres",
    "settings.subtitle": "Tout ce qu'il faut pour rester maître du carnet.",
    "settings.language": "Langue",
    "settings.languageHint":
      "L'anglais est la langue par défaut. Les changements s'appliquent immédiatement.",
    "settings.appearance": "Apparence",
    "settings.appearance.light": "Clair",
    "settings.appearance.dark": "Sombre",
    "settings.appearanceHint": "Choisissez l'apparence du carnet sur votre écran.",
    "settings.mobileMoney": "Mobile money",
    "settings.mobileMoney.linked": "Connecté",
    "settings.mobileMoney.notLinked": "Non connecté",
    "settings.mobileMoneyHint":
      "Reliez votre opérateur de mobile money pour recevoir les transferts ici.",
    "settings.account": "Compte",
    "settings.signedInAs": "Connecté en tant que {name}",
    "settings.guest": "Session invité",
    "settings.guestHint":
      "Vos données restent sur cet appareil. Connectez-vous pour les refléter sur votre compte.",
    "settings.signIn": "Se connecter / créer un compte",
    "settings.signOut": "Se déconnecter",
    "settings.data": "Données",
    "settings.syncStatus": "État de la synchronisation",
    "settings.backup": "Sauvegarde",
    "settings.storage": "Sur cet appareil",
    "settings.storageValue": "{count} dépenses stockées localement",
    "settings.clearData": "Supprimer toutes les données locales",
    "settings.clearTitle": "Supprimer toutes les données locales ?",
    "settings.clearBody":
      "{count} dépenses seront supprimées de cet appareil et de votre compte.",
    "settings.clearConfirm": "Tout supprimer",
    "settings.aboutTitle": "À propos",
    "settings.aboutBody":
      "Trust Us suit les dépenses en ariary malgache (MGA) avec une interface café-torréfié : pas de courbes, que des chiffres.",
    "category.added": "Catégorie ajoutée",
    "category.updated": "Catégorie mise à jour",
    "category.deleted": "Catégorie supprimée",
    "category.rename": "Renommer la catégorie",
    "category.deleteHint": "Supprimer la catégorie",
    "category.namePlaceholder": "Nom de la nouvelle catégorie",
    "footer.copyright": "© 2026 Alex Noah RANDRIANARISOA. Tous droits réservés.",
    "footer.license": "Licence MIT",
    "footer.madeIn": "Fabriqué à Madagascar",
    "footer.note": "Pour des dépenses auxquelles vous pouvez vraiment faire confiance.",
    "auth.title": "Bienvenue sur Trust Us",
    "auth.subtitle": "Connectez-vous avec votre code e-mail, ou continuez en invité.",
    "auth.emailLabel": "E-mail",
    "auth.emailPlaceholder": "vous@domaine.com",
    "auth.errorEmail": "Saisissez une adresse e-mail valide.",
    "auth.continue": "Continuer",
    "auth.or": "ou",
    "auth.guest": "Continuer en invité",
    "auth.verifyTitle": "Vérifiez votre e-mail",
    "auth.verifySubtitle": "Nous avons envoyé un code à {email}. Saisissez-le ci-dessous.",
    "auth.useDifferent": "Utiliser une autre adresse",
    "auth.verifying": "Vérification…",
    "auth.verify": "Vérifier",
    "auth.securedBy": "Sécurisé par des codes e-mail.",
    "auth.backHome": "Retour à l'accueil",
    "auth.errorCode": "Code incorrect. Réessayez.",
    "settings.cleared": "Données effacées",
    "home.thisMonth": "Ce mois-ci",
    "entry.expense": "Dépense",
    "entry.income": "Revenu",
    "calendar.cancel": "Annuler",
    "category.food": "Nourriture",
    "category.transport": "Transport",
    "category.housing": "Logement",
    "category.shopping": "Achats",
    "category.health": "Santé",
    "category.family": "Famille",
    "category.education": "Éducation",
    "category.bills": "Factures",
    "category.leisure": "Loisirs",
    "category.other": "Autre",
    "nav.home": "Accueil",
    "nav.calendar": "Calendrier",
    "nav.report": "Relevé",
    "nav.settings": "Paramètres",
    "nav.history": "Historique",
  },
  it: {
    "app.name": "Trust Us",
    "app.tagline": "Le spese del portafoglio, finalmente conteggiate.",
    "app.currency": "MGA",
    "app.slogan": "Niente curve, solo numeri.",
    "app.month": "Mese",
    "landing.title": "Il tuo portafoglio, finalmente a casa",
    "landing.subtitle":
      "Trust Us è un quaderno per i portafogli malgasci. Inserisci una spesa in pochi secondi, sfoglia il calendario e leggi un estratto chiaro — online o completamente offline.",
    "landing.trustLine": "Nessuna carta necessaria · I dati restano prima sul tuo dispositivo",
    "landing.badge": "Affidabile, non alla moda",
    "landing.featuresTitle": "Costruito per il modo in cui il denaro si muove davvero",
    "landing.featuresSubtitle":
      "Sei cose fatte bene, perché il saldo finalmente corrisponda alla realtà.",
    "landing.stepsTitle": "Dallo scontrino all'estratto in tre passi",
    "landing.step1.title": "Inserisci",
    "landing.step1.body": "Un importo in Ariary, una categoria, una nota facoltativa. Circa cinque secondi.",
    "landing.step2.title": "Leggi il calendario",
    "landing.step2.body":
      "I giorni costosi risaltano subito, così puoi agire mentre il mese è ancora davanti a te.",
    "landing.step3.title": "Chiudi il mese",
    "landing.step3.body": "Apri l'estratto, confrontalo con il tuo budget e portati dietro la lezione.",
    "landing.stats.languages": "Lingue",
    "landing.stats.currency": "Valuta",
    "landing.stats.storage": "Archiviazione",
    "landing.stats.storageValue": "Dispositivo + cloud",
    "landing.stats.sync": "Modalità offline",
    "landing.stats.syncValue": "Sempre attiva",
    "landing.footerRights": "Trust Us. Per spese su cui puoi contare.",
    "landing.mock.balance": "Saldo totale",
    "landing.mock.card": "Portafoglio in addebito",
    "landing.mock.quick": "Aggiunta rapida",
    "landing.mock.recent": "Ultime voci",
    "landing.mock.calendar": "Calendario",
    "landing.mock.statement": "Estratto",
    "landing.mock.income": "Entrate",
    "landing.mock.expenses": "Spese",
    "landing.primaryCta": "Inizia a tenere traccia",
    "landing.secondaryCta": "Scopri come funziona",
    "landing.feature.calendar.title": "Calendario delle spese",
    "landing.feature.calendar.body":
      "Ogni giorno mostra il suo totale. Tocca un giorno per vedere gli scontrini dietro di esso.",
    "landing.feature.report.title": "Estratto dettagliato",
    "landing.feature.report.body":
      "Totali mensili, ritmo giornaliero e ripartizione per categoria con confronto del budget.",
    "landing.feature.auth.title": "Account utente",
    "landing.feature.auth.body":
      "Accedi con un codice e-mail, o continua come ospite — il quaderno è tuo in ogni caso.",
    "landing.feature.sync.title": "Solo locale",
    "landing.feature.sync.body":
      "Ogni voce è salvata solo su questo dispositivo — niente viene caricato online.",
    "landing.feature.multi.title": "Pulizia su più giorni",
    "landing.feature.multi.body":
      "Seleziona più giorni, controlla il numero ed elimina solo dopo conferma.",
    "landing.feature.language.title": "Cinque lingue",
    "landing.feature.language.body":
      "L'inglese in predefinito, più malgascio, francese, italiano e tedesco.",
    "home.welcomeBack": "Bentornato",
    "home.guestName": "Portafoglio ospite",
    "home.totalBalance": "Saldo totale",
    "home.monthSpend": "Speso a {month}",
    "home.entries": "{count} voci",
    "home.recent": "Ultime voci",
    "home.empty": "Niente di registrato per ora",
    "home.emptyHint":
      "Aggiungi la tua prima spesa — viene salvata prima su questo dispositivo.",
    "home.quickAdd": "Aggiunta rapida",
    "home.todaySpend": "Spese di oggi",
    "home.balanceHidden": "Saldo nascosto",
    "home.showBalance": "Mostra il saldo",
    "home.hideBalance": "Nascondi il saldo",
    "home.budgetLeft": "Budget rimanente",
    "home.topCategory": "Categoria principale",
    "home.sync.synced": "Sincronizzato con il tuo account",
    "home.sync.syncing": "Sincronizzazione…",
    "home.sync.local": "Salvato su questo dispositivo",
    "home.sync.signIn": "Accedi per sincronizzare",
    "expense.newTitle": "Nuova spesa",
    "expense.editTitle": "Modifica spesa",
    "expense.amount": "Importo (MGA)",
    "expense.description": "Nota",
    "expense.category": "Categoria",
    "expense.date": "Data",
    "expense.dateHint": "Scegli il giorno in cui i soldi ti hanno lasciato",
    "expense.invalidAmount": "Inserisci un importo maggiore di zero.",
    "expense.pickDates": "Scegli le date",
    "expense.dates": "Date",
    "expense.datesSelected": "{count} selezionate",
    "expense.descriptionPlaceholder": "Souvenir Antananarivo",
    "expense.added": "Spesa aggiunta",
    "expense.updated": "Spesa aggiornata",
    "expense.manageCategories": "Gestisci le categorie",
    "expense.categoryDone": "Categorie completate",
    "expense.addTitle": "Nuova spesa",
    "income.amount": "Importo",
    "income.description": "Nota",
    "income.descriptionPlaceholder": "Souvenir Antananarivo",
    "income.source": "Fonte",
    "income.sourcePlaceholder": "Credito telefonico",
    "income.date": "Data",
    "income.time": "Ora",
    "income.timePlaceholder": "14:30",
    "income.invalidAmount": "Inserisci un importo maggiore di zero.",
    "income.added": "Entrata aggiunta",
    "income.subtitle": "Il denaro che è arrivato. Aggiungilo con un tocco.",
    "income.history": "Entrate recenti",
    "income.historyHint": "Soldi già registrati per questo mese.",
    "income.historyEmpty": "Ancora niente. Aggiungi la tua prima entrata.",
    "income.delete": "Elimina entrata",
    "calendar.title": "Calendario delle spese",
    "calendar.subtitle": "Scegli un giorno da rivedere, o più giorni da sistemare.",
    "calendar.selected": "{count} giorni selezionati",
    "calendar.selectedOne": "1 giorno selezionato",
    "calendar.clearSelection": "Cancella la selezione",
    "calendar.deleteSelected": "Elimina i giorni selezionati",
    "calendar.dayTotal": "{count} spese · {total}",
    "calendar.noExpenses": "Niente di registrato per questo giorno.",
    "calendar.dayListTitle": "Spese del giorno selezionato",
    "calendar.dayLabel": "Giorno",
    "calendar.multiSelect": "Selezione multipla",
    "calendar.selectDay": "Seleziona questo giorno",
    "calendar.back": "Indietro",
    "calendar.next": "Avanti",
    "calendar.today": "Oggi",
    "calendar.busiest": "Il più carico",
    "calendar.selectHint": "Seleziona un giorno per vedere i suoi scontrini",
    "delete.title": "Elimina",
    "delete.body":
      "{count} spese saranno eliminate definitivamente da questo dispositivo e dal tuo account. Questa azione non può essere annullata.",
    "delete.bodyOne":
      "1 spesa sarà eliminata definitivamente da questo dispositivo e dal tuo account. Questa azione non può essere annullata.",
    "delete.done": "Spese eliminate",
    "delete.confirm": "Elimina",
    "report.title": "Estratto dettagliato",
    "report.subtitle": "Tutto quello che hai speso, ordinato per categoria e per giorno.",
    "report.topCategory": "Categoria principale",
    "report.byCategory": "Per categoria",
    "report.byDay": "Ritmo quotidiano",
    "report.split": "Ripartizione per categoria",
    "report.categoriesUsed": "Categorie usate",
    "report.budget": "Budget",
    "report.overBudget": "{amount} oltre il budget",
    "report.noBudget": "Nessun budget impostato",
    "report.noData": "Niente di registrato in questo periodo.",
    "report.share": "Copia l'estratto",
    "report.copied": "Estratto copiato",
    "report.busiestDay": "Giorno più costoso",
    "report.quietestDay": "Giorno più tranquillo",
    "report.bySource": "Entrate per fonte",
    "report.ofIncome": "{percent}% delle entrate",
    "report.ofTotal": "{percent}% del totale",
    "report.totalSpent": "Totale speso",
    "report.totalIncome": "Entrate totali",
    "report.net": "Netto",
    "report.average": "Media",
    "report.entries": "Voci",
    "report.incomeEntries": "Voci di entrata",
    "report.noIncome": "Ancora nessuna entrata",
    "report.budgetLeft": "Budget rimanente",
    "report.incomeBrokeEven": "Pareggio raggiunto",
    "history.title": "Cronologia",
    "history.subtitle": "Ogni voce, nell'ordine in cui è arrivata.",
    "history.empty": "Niente di registrato per ora",
    "history.emptyHint":
      "Aggiungi una spesa o un'entrata — qui ogni voce conserva la sua data e ora.",
    "history.addExpense": "Aggiungi spesa",
    "history.addIncome": "Aggiungi entrata",
    "history.incomeFallback": "Entrata",
    "history.count": "{count} voci in totale",
    "common.today": "Oggi",
    "common.add": "Aggiungi",
    "common.cancel": "Annulla",
    "common.save": "Salva",
    "common.delete": "Elimina",
    "common.viewAll": "Vedi tutto",
    "common.manage": "Gestisci",
    "common.rename": "Rinomina",
    "common.name": "Nome",
    "common.addCategory": "Aggiungi categoria",
    "settings.title": "Impostazioni",
    "settings.subtitle": "Tutto ciò che serve per tenere il quaderno tuo.",
    "settings.language": "Lingua",
    "settings.languageHint": "L'inglese è la lingua predefinita. Le modifiche si applicano subito.",
    "settings.appearance": "Aspetto",
    "settings.appearance.light": "Chiaro",
    "settings.appearance.dark": "Scuro",
    "settings.appearanceHint": "Scegli l'aspetto del quaderno sul tuo schermo.",
    "settings.mobileMoney": "Mobile money",
    "settings.mobileMoney.linked": "Collegato",
    "settings.mobileMoney.notLinked": "Non collegato",
    "settings.mobileMoneyHint":
      "Collega il tuo provider di mobile money per ricevere i trasferimenti qui.",
    "settings.account": "Account",
    "settings.signedInAs": "Registrato come {name}",
    "settings.guest": "Sessione ospite",
    "settings.guestHint":
      "I tuoi dati restano su questo dispositivo. Accedi per rifletterli sul tuo account.",
    "settings.signIn": "Accedi / crea un account",
    "settings.signOut": "Esci",
    "settings.data": "Dati",
    "settings.syncStatus": "Stato sincronizzazione",
    "settings.backup": "Backup",
    "settings.storage": "Su questo dispositivo",
    "settings.storageValue": "{count} spese salvate in locale",
    "settings.clearData": "Elimina tutti i dati locali",
    "settings.clearTitle": "Eliminare tutti i dati locali?",
    "settings.clearBody":
      "{count} spese saranno rimosse da questo dispositivo e dal tuo account.",
    "settings.clearConfirm": "Elimina tutto",
    "settings.aboutTitle": "Informazioni",
    "settings.aboutBody":
      "Trust Us registra le spese in ariary malgascio (MGA) con un'interfaccia caffè-e-tostatura: niente curve, solo numeri.",
    "category.added": "Categoria aggiunta",
    "category.updated": "Categoria aggiornata",
    "category.deleted": "Categoria eliminata",
    "category.rename": "Rinomina categoria",
    "category.deleteHint": "Elimina categoria",
    "category.namePlaceholder": "Nome della nuova categoria",
    "footer.copyright": "© 2026 Alex Noah RANDRIANARISOA. Tutti i diritti riservati.",
    "footer.license": "Licenza MIT",
    "footer.madeIn": "Fatto in Madagascar",
    "footer.note": "Per spese su cui puoi davvero contare.",
    "auth.title": "Benvenuto su Trust Us",
    "auth.subtitle": "Accedi con il tuo codice e-mail, o continua come ospite.",
    "auth.emailLabel": "E-mail",
    "auth.emailPlaceholder": "tu@dominio.com",
    "auth.errorEmail": "Inserisci un indirizzo e-mail valido.",
    "auth.continue": "Continua",
    "auth.or": "oppure",
    "auth.guest": "Continua come ospite",
    "auth.verifyTitle": "Verifica la tua e-mail",
    "auth.verifySubtitle": "Abbiamo inviato un codice a {email}. Inseriscilo qui sotto.",
    "auth.useDifferent": "Usa un'altra e-mail",
    "auth.verifying": "Verifica in corso…",
    "auth.verify": "Verifica",
    "auth.securedBy": "Protetto da codi e-mail magic link.",
    "auth.backHome": "Torna alla home",
    "auth.errorCode": "Codice errato. Riprova.",
    "settings.cleared": "Dati cancellati",
    "home.thisMonth": "Questo mese",
    "entry.expense": "Spesa",
    "entry.income": "Entrata",
    "calendar.cancel": "Annulla",
    "category.food": "Cibo",
    "category.transport": "Trasporti",
    "category.housing": "Abitazione",
    "category.shopping": "Shopping",
    "category.health": "Salute",
    "category.family": "Famiglia",
    "category.education": "Istruzione",
    "category.bills": "Bollette",
    "category.leisure": "Tempo libero",
    "category.other": "Altro",
    "nav.home": "Home",
    "nav.calendar": "Calendario",
    "nav.report": "Estratto",
    "nav.settings": "Impostazioni",
    "nav.history": "Cronologia",
  },
  de: {
    "app.name": "Trust Us",
    "app.tagline": "Portemonnaie-Ausgaben, endlich erfasst.",
    "app.currency": "MGA",
    "app.slogan": "Keine Kurven, nur Zahlen.",
    "app.month": "Monat",
    "landing.title": "Dein Portemonnaie, endlich zu Hause",
    "landing.subtitle":
      "Trust Us ist ein Notizbuch für madagassische Portemonnaies. Erfasse eine Ausgabe in Sekunden, blättere durch den Kalender und lies eine klare Übersicht — online oder komplett offline.",
    "landing.trustLine": "Keine Karte nötig · Daten bleiben zuerst auf deinem Gerät",
    "landing.badge": "Verlässlich, nicht modisch",
    "landing.featuresTitle": "Gebaut für die Art, wie Geld wirklich fließt",
    "landing.featuresSubtitle":
      "Sechs Dinge, richtig gemacht, damit der Saldo endlich zur Realität passt.",
    "landing.stepsTitle": "Vom Beleg zur Übersicht in drei Schritten",
    "landing.step1.title": "Erfassen",
    "landing.step1.body": "Betrag in Ariary, Kategorie, optionale Notiz. Etwa fünf Sekunden.",
    "landing.step2.title": "Kalender lesen",
    "landing.step2.body":
      "Teure Tage fallen sofort auf, damit du handeln kannst, solange der Monat noch vor dir liegt.",
    "landing.step3.title": "Den Monat abschließen",
    "landing.step3.body": "Öffne die Übersicht, vergleiche sie mit deinem Budget und nimm die Lehre mit.",
    "landing.stats.languages": "Sprachen",
    "landing.stats.currency": "Währung",
    "landing.stats.storage": "Speicher",
    "landing.stats.storageValue": "Gerät + Cloud",
    "landing.stats.sync": "Offline-Modus",
    "landing.stats.syncValue": "Immer aktiv",
    "landing.footerRights": "Trust Us. Für Ausgaben, denen du vertraust.",
    "landing.mock.balance": "Gesamtsaldo",
    "landing.mock.card": "Debit-Portemonnaie",
    "landing.mock.quick": "Schnell erfassen",
    "landing.mock.recent": "Letzte Buchungen",
    "landing.mock.calendar": "Kalender",
    "landing.mock.statement": "Übersicht",
    "landing.mock.income": "Einnahmen",
    "landing.mock.expenses": "Ausgaben",
    "landing.primaryCta": "Tracking starten",
    "landing.secondaryCta": "So funktioniert es",
    "landing.feature.calendar.title": "Ausgabenkalender",
    "landing.feature.calendar.body":
      "Jeder Tag zeigt seine Summe. Tippe auf einen Tag, um die Belege dahinter zu sehen.",
    "landing.feature.report.title": "Detaillierte Übersicht",
    "landing.feature.report.body":
      "Monatssummen, Tagesrhythmus und Aufteilung nach Kategorien inklusive Budgetvergleich.",
    "landing.feature.auth.title": "Benutzerkonten",
    "landing.feature.auth.body":
      "Melde dich per E-Mail-Code an oder fahre als Gast fort — das Notizbuch gehört dir in beiden Fällen.",
    "landing.feature.sync.title": "Nur lokal",
    "landing.feature.sync.body":
      "Jeder Eintrag wird nur auf diesem Gerät gespeichert — nichts wird online gesendet.",
    "landing.feature.multi.title": "Mehrere Tage aufräumen",
    "landing.feature.multi.body":
      "Mehrere Tage auswählen, Anzahl prüfen und erst nach Bestätigung löschen.",
    "landing.feature.language.title": "Fünf Sprachen",
    "landing.feature.language.body":
      "Englisch als Standard, dazu Malagasy, Französisch, Italienisch und Deutsch.",
    "home.welcomeBack": "Willkommen zurück",
    "home.guestName": "Gast-Portemonnaie",
    "home.totalBalance": "Gesamtsaldo",
    "home.monthSpend": "Ausgegeben in {month}",
    "home.entries": "{count} Einträge",
    "home.recent": "Letzte Buchungen",
    "home.empty": "Noch nichts erfasst",
    "home.emptyHint":
      "Erfasse deine erste Ausgabe — sie wird zuerst auf diesem Gerät gespeichert.",
    "home.quickAdd": "Schnell erfassen",
    "home.todaySpend": "Heutige Ausgaben",
    "home.balanceHidden": "Saldo ausgeblendet",
    "home.showBalance": "Saldo anzeigen",
    "home.hideBalance": "Saldo ausblenden",
    "home.budgetLeft": "Budget übrig",
    "home.topCategory": "Größte Kategorie",
    "home.sync.synced": "Mit deinem Konto synchronisiert",
    "home.sync.syncing": "Synchronisiere…",
    "home.sync.local": "Auf diesem Gerät gespeichert",
    "home.sync.signIn": "Zum Synchronisieren anmelden",
    "expense.newTitle": "Neue Ausgabe",
    "expense.editTitle": "Ausgabe bearbeiten",
    "expense.amount": "Betrag (MGA)",
    "expense.description": "Notiz",
    "expense.category": "Kategorie",
    "expense.date": "Datum",
    "expense.dateHint": "Wähle den Tag, an dem das Geld dich verlassen hat",
    "expense.invalidAmount": "Gib einen Betrag über null ein.",
    "expense.pickDates": "Daten wählen",
    "expense.dates": "Daten",
    "expense.datesSelected": "{count} ausgewählt",
    "expense.descriptionPlaceholder": "Souvenir Antananarivo",
    "expense.added": "Ausgabe hinzugefügt",
    "expense.updated": "Ausgabe aktualisiert",
    "expense.manageCategories": "Kategorien verwalten",
    "expense.categoryDone": "Kategorien erledigt",
    "expense.addTitle": "Neue Ausgabe",
    "income.amount": "Betrag",
    "income.description": "Notiz",
    "income.descriptionPlaceholder": "Souvenir Antananarivo",
    "income.source": "Quelle",
    "income.sourcePlaceholder": "Telefonguthaben",
    "income.date": "Datum",
    "income.time": "Uhrzeit",
    "income.timePlaceholder": "14:30",
    "income.invalidAmount": "Gib einen Betrag über null ein.",
    "income.added": "Einnahme hinzugefügt",
    "income.subtitle": "Das Geld, das reinkam. Ein Tipp genügt.",
    "income.history": "Letzte Einnahmen",
    "income.historyHint": "Bereits für diesen Monat erfasstes Geld.",
    "income.historyEmpty": "Noch nichts. Erfasse deine erste Einnahme.",
    "income.delete": "Einnahme löschen",
    "calendar.title": "Ausgabenkalender",
    "calendar.subtitle": "Wähle einen Tag zum Durchsehen oder mehrere Tage zum Aufräumen.",
    "calendar.selected": "{count} Tage ausgewählt",
    "calendar.selectedOne": "1 Tag ausgewählt",
    "calendar.clearSelection": "Auswahl aufheben",
    "calendar.deleteSelected": "Ausgewählte Tage löschen",
    "calendar.dayTotal": "{count} Ausgaben · {total}",
    "calendar.noExpenses": "Für diesen Tag ist nichts erfasst.",
    "calendar.dayListTitle": "Ausgaben des ausgewählten Tages",
    "calendar.dayLabel": "Tag",
    "calendar.multiSelect": "Mehrfachauswahl",
    "calendar.selectDay": "Diesen Tag auswählen",
    "calendar.back": "Zurück",
    "calendar.next": "Weiter",
    "calendar.today": "Heute",
    "calendar.busiest": "Stärkster Tag",
    "calendar.selectHint": "Wähle einen Tag, um seine Belege zu sehen",
    "delete.title": "Löschen",
    "delete.body":
      "{count} Ausgaben werden dauerhaft von diesem Gerät und deinem Konto entfernt. Das kann nicht rückgängig gemacht werden.",
    "delete.bodyOne":
      "1 Ausgabe wird dauerhaft von diesem Gerät und deinem Konto entfernt. Das kann nicht rückgängig gemacht werden.",
    "delete.done": "Ausgaben gelöscht",
    "delete.confirm": "Löschen",
    "report.title": "Detaillierte Übersicht",
    "report.subtitle": "Alles, was du ausgegeben hast, sortiert nach Kategorie und Tag.",
    "report.topCategory": "Größte Kategorie",
    "report.byCategory": "Nach Kategorie",
    "report.byDay": "Tagesrhythmus",
    "report.split": "Aufteilung nach Kategorie",
    "report.categoriesUsed": "Genutzte Kategorien",
    "report.budget": "Budget",
    "report.overBudget": "{amount} über dem Budget",
    "report.noBudget": "Kein Budget festgelegt",
    "report.noData": "Für diesen Zeitraum ist nichts erfasst.",
    "report.share": "Übersicht kopieren",
    "report.copied": "Übersicht kopiert",
    "report.busiestDay": "Teuerster Tag",
    "report.quietestDay": "Ruhigster Tag",
    "report.bySource": "Einnahmen nach Quelle",
    "report.ofIncome": "{percent}% der Einnahmen",
    "report.ofTotal": "{percent}% der Summe",
    "report.totalSpent": "Ausgegeben gesamt",
    "report.totalIncome": "Einnahmen gesamt",
    "report.net": "Netto",
    "report.average": "Durchschnitt",
    "report.entries": "Einträge",
    "report.incomeEntries": "Einnahmeeinträge",
    "report.noIncome": "Noch keine Einnahmen",
    "report.budgetLeft": "Budget übrig",
    "report.incomeBrokeEven": "Schwarze Null",
    "history.title": "Verlauf",
    "history.subtitle": "Jeder Eintrag, in der Reihenfolge, in der er kam.",
    "history.empty": "Noch nichts erfasst",
    "history.emptyHint":
      "Füge eine Ausgabe oder Einnahme hinzu — jeder Eintrag behält hier Datum und Uhrzeit.",
    "history.addExpense": "Ausgabe hinzufügen",
    "history.addIncome": "Einnahme hinzufügen",
    "history.incomeFallback": "Einnahme",
    "history.count": "{count} Einträge gesamt",
    "common.today": "Heute",
    "common.add": "Hinzufügen",
    "common.cancel": "Abbrechen",
    "common.save": "Speichern",
    "common.delete": "Löschen",
    "common.viewAll": "Alle ansehen",
    "common.manage": "Verwalten",
    "common.rename": "Umbenennen",
    "common.name": "Name",
    "common.addCategory": "Kategorie hinzufügen",
    "settings.title": "Einstellungen",
    "settings.subtitle": "Alles, um das Notizbuch deins zu halten.",
    "settings.language": "Sprache",
    "settings.languageHint": "Englisch ist die Standardsprache. Änderungen greifen sofort.",
    "settings.appearance": "Erscheinungsbild",
    "settings.appearance.light": "Hell",
    "settings.appearance.dark": "Dunkel",
    "settings.appearanceHint": "Wähle, wie das Notizbuch auf deinem Bildschirm aussieht.",
    "settings.mobileMoney": "Mobile Money",
    "settings.mobileMoney.linked": "Verknüpft",
    "settings.mobileMoney.notLinked": "Nicht verknüpft",
    "settings.mobileMoneyHint":
      "Verknüpfe deinen Mobile-Money-Anbieter, um Überweisungen hier zu empfangen.",
    "settings.account": "Konto",
    "settings.signedInAs": "Angemeldet als {name}",
    "settings.guest": "Gast-Sitzung",
    "settings.guestHint":
      "Deine Daten bleiben auf diesem Gerät. Melde dich an, um sie in dein Konto zu spiegeln.",
    "settings.signIn": "Anmelden / Konto erstellen",
    "settings.signOut": "Abmelden",
    "settings.data": "Daten",
    "settings.syncStatus": "Synchronisierungsstatus",
    "settings.backup": "Sicherung",
    "settings.storage": "Auf diesem Gerät",
    "settings.storageValue": "{count} Ausgaben lokal gespeichert",
    "settings.clearData": "Alle lokalen Daten löschen",
    "settings.clearTitle": "Alle lokalen Daten löschen?",
    "settings.clearBody":
      "{count} Ausgaben werden von diesem Gerät und deinem Konto entfernt.",
    "settings.clearConfirm": "Alles löschen",
    "settings.aboutTitle": "Über",
    "settings.aboutBody":
      "Trust Us erfasst Ausgaben in madagassischen Ariary (MGA) mit einer Kaffee-und-Röst- Oberfläche: keine Kurven, nur Zahlen.",
    "category.added": "Kategorie hinzugefügt",
    "category.updated": "Kategorie aktualisiert",
    "category.deleted": "Kategorie gelöscht",
    "category.rename": "Kategorie umbenennen",
    "category.deleteHint": "Kategorie löschen",
    "category.namePlaceholder": "Name der neuen Kategorie",
    "footer.copyright": "© 2026 Alex Noah RANDRIANARISOA. Alle Rechte vorbehalten.",
    "footer.license": "MIT-Lizenz",
    "footer.madeIn": "Gemacht in Madagaskar",
    "footer.note": "Für Ausgaben, denen man wirklich vertrauen kann.",
    "auth.title": "Willkommen bei Trust Us",
    "auth.subtitle": "Melde dich mit deinem E-Mail-Code an oder fahre als Gast fort.",
    "auth.emailLabel": "E-Mail",
    "auth.emailPlaceholder": "du@domäne.com",
    "auth.errorEmail": "Gib eine gültige E-Mail-Adresse ein.",
    "auth.continue": "Weiter",
    "auth.or": "oder",
    "auth.guest": "Als Gast fortfahren",
    "auth.verifyTitle": "Bestätige deine E-Mail",
    "auth.verifySubtitle": "Wir haben einen Code an {email} gesendet. Gib ihn unten ein.",
    "auth.useDifferent": "Andere E-Mail verwenden",
    "auth.verifying": "Wird geprüft…",
    "auth.verify": "Bestätigen",
    "auth.securedBy": "Gesichert durch E-Mail-Codes.",
    "auth.backHome": "Zurück zur Startseite",
    "auth.errorCode": "Falscher Code. Versuche es erneut.",
    "settings.cleared": "Daten gelöscht",
    "home.thisMonth": "Diesen Monat",
    "entry.expense": "Ausgabe",
    "entry.income": "Einnahme",
    "calendar.cancel": "Abbrechen",
    "category.food": "Essen",
    "category.transport": "Transport",
    "category.housing": "Wohnung",
    "category.shopping": "Einkaufen",
    "category.health": "Gesundheit",
    "category.family": "Familie",
    "category.education": "Bildung",
    "category.bills": "Rechnungen",
    "category.leisure": "Freizeit",
    "category.other": "Sonstiges",
    "nav.home": "Start",
    "nav.calendar": "Kalender",
    "nav.report": "Übersicht",
    "nav.settings": "Einstellungen",
    "nav.history": "Verlauf",
  },
};

/** Canonical expense categories. Labels come from the dictionary. */
export const CATEGORIES = [
  "food",
  "transport",
  "housing",
  "shopping",
  "health",
  "family",
  "education",
  "bills",
  "leisure",
  "other",
] as const;

export type CategoryKey = (typeof CATEGORIES)[number];

export function isCategory(value: string): value is CategoryKey {
  return (CATEGORIES as readonly string[]).includes(value);
}

/** Return the locale map for a language code. */
export const LOCALES: Record<LanguageCode, string> = {
  en: "en-GB",
  mg: "mg-MG",
  fr: "fr-FR",
  it: "it-IT",
  de: "de-DE",
};

/** Translate a key through the current language dictionary, with fallback to English. */
export function translate(
  language: LanguageCode,
  key: TranslationKey,
  vars?: Record<string, string | number>,
): string {
  const dictionariesByLang = dictionaries as Record<LanguageCode, Record<TranslationKey, string>>;
  const template = dictionariesByLang[language]?.[key] ?? dictionaries.en[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{([^}]*)\}/g, (match, name) =>
    vars[name] === undefined ? match : String(vars[name]),
  );
}
