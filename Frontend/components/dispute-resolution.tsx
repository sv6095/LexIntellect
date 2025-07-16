"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Scale,
  FileText,
  MessageSquare,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Filter,
  Search,
  ArrowRight,
  Loader2,
  Download,
  Upload,
  Eye,
  Gavel,
  BookOpen,
  Shield,
  Award,
  AlertCircle,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Building,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import { Badge } from "./ui/badge"
import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast"
import { Label } from "./ui/label"
import { Progress } from "./ui/progress"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"

interface DisputeCase {
  id: string
  title: string
  status: "Pending" | "In Progress" | "Resolved" | "Appealed" | "Closed"
  priority: "High" | "Medium" | "Low"
  partyA: PartyInfo
  partyB: PartyInfo
  description: string
  category: DisputeCategory
  amount?: number
  currency: string
  filingDate: string
  hearingDate?: string
  location: string
  proposedSolution?: string
  messages: Message[]
  documents: Document[]
  timeline: TimelineEvent[]
  jurisdiction: string
  language: string
  isPublic: boolean
  mediator?: string
  evidence: Evidence[]
  complianceChecks: ComplianceCheck[]
}

interface PartyInfo {
  name: string
  type: "Individual" | "Company" | "Organization" | "Government"
  address: string
  phone: string
  email: string
  representative?: string
  panCard?: string
  gstNumber?: string
  cin?: string
  verified: boolean
}

interface Document {
  id: string
  name: string
  type: "Contract" | "Evidence" | "Legal Notice" | "Affidavit" | "Other"
  uploadDate: string
  size: string
  verified: boolean
  confidential: boolean
}

interface Evidence {
  id: string
  type: "Documentary" | "Witness" | "Expert Opinion" | "Digital" | "Physical"
  description: string
  authenticity: "Verified" | "Pending" | "Disputed"
  submittedBy: string
  date: string
}

interface ComplianceCheck {
  requirement: string
  status: "Compliant" | "Non-Compliant" | "Pending"
  details: string
  deadline?: string
}

interface TimelineEvent {
  date: string
  event: string
  description: string
  type: "filing" | "hearing" | "decision" | "appeal" | "settlement"
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  type: "message" | "proposal" | "system" | "legal_notice"
  urgent: boolean
  read: boolean
}

interface AnalysisResult {
  claimantLegalReferences: LegalReference[]
  respondentLegalReferences: LegalReference[]
  suggestedResolution: string
  ethicalRecommendations: string[]
  panchName?: string
  mainRule?: string
  dissenting?: string[]
  consideredRules?: string[]
  matchStrength?: string
  matchedKeywords?: string[]
  confidenceScore: number
  alternativeResolutions: string[]
  timelineEstimate: string
  costEstimate: string
  successProbability: number
  risks: string[]
  complianceRequirements: string[]
  jurisdiction: string
  applicableLaws: string[]
  limitationPeriod: string
  appealOptions: string[]
}

interface LegalReference {
  section: string
  act: string
  explanation: string
  relevance: number
  category: string
  lastUpdated: string
}

interface DisputeRule {
  id: string
  keywordsA: string[]
  keywordsB: string[]
  category: DisputeCategory
  subcategory: string
  claimantLegalReferences: LegalReference[]
  respondentLegalReferences: LegalReference[]
  suggestedResolution: string
  ethicalRecommendations: string[]
  jurisdiction: string[]
  timelineEstimate: string
  costEstimate: string
  complianceRequirements: string[]
  alternativeResolutions: string[]
  risks: string[]
  successProbability: number
  limitationPeriod: string
  appealOptions: string[]
}

type DisputeCategory = 
  | "Contract Law"
  | "Labor Law"
  | "Property Law"
  | "Consumer Protection"
  | "Family Law"
  | "Intellectual Property"
  | "Criminal Law"
  | "Environmental Law"
  | "Tax Law"
  | "Company Law"
  | "Cyber Law"
  | "Human Rights"
  | "Administrative Law"
  | "Banking Law"
  | "Insurance Law"
  | "Constitutional Law"
  | "Commercial Law"
  | "Arbitration"
  | "Alternative Dispute Resolution"

// Comprehensive Indian Legal Framework
const ENHANCED_DISPUTE_RULES: DisputeRule[] = [
  // Contract Law - Enhanced
  {
    id: "contract_001",
    keywordsA: ["breach", "contract", "agreement", "violation"],
    keywordsB: ["delay", "performance", "default", "non-performance"],
    category: "Contract Law",
    subcategory: "Breach of Contract",
    claimantLegalReferences: [
      {
        section: "Section 73",
        act: "Indian Contract Act, 1872",
        explanation: "Compensation for loss or damage caused by breach of contract. The party who suffers by breach is entitled to damages.",
        relevance: 95,
        category: "Remedies",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 74",
        act: "Indian Contract Act, 1872",
        explanation: "Compensation for breach of contract where penalty stipulated. Reasonable compensation not exceeding penalty amount.",
        relevance: 85,
        category: "Remedies",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 55",
        act: "Indian Contract Act, 1872",
        explanation: "Effect of failure to perform at time fixed. Contract becomes voidable at option of promisee if time is essence.",
        relevance: 80,
        category: "Performance",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 56",
        act: "Indian Contract Act, 1872",
        explanation: "Agreement to do impossible act. Act becoming impossible after contract is made.",
        relevance: 70,
        category: "Impossibility",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "The respondent should compensate the claimant for losses arising from breach, considering any justified delays or impossibility of performance.",
    ethicalRecommendations: [
      "Act in good faith and honor contractual commitments",
      "Communicate delays or difficulties promptly",
      "Seek mutual resolution before litigation"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "6-18 months",
    costEstimate: "₹50,000 - ₹5,00,000",
    complianceRequirements: [
      "Proper notice of breach served",
      "Mitigation of damages attempted",
      "Contract terms clearly established"
    ],
    alternativeResolutions: [
      "Renegotiate contract terms",
      "Extend performance timeline",
      "Partial performance with reduced consideration"
    ],
    risks: [
      "Counter-claims for damages",
      "Lengthy litigation process",
      "Enforcement challenges"
    ],
    successProbability: 75,
    limitationPeriod: "3 years from date of breach",
    appealOptions: [
      "High Court appeal within 90 days",
      "Supreme Court SLP if substantial question of law"
    ]
  },
  
  // Labor Law - Enhanced
  {
    id: "labor_001",
    keywordsA: ["termination", "fired", "dismissed", "retrenchment", "wrongful dismissal"],
    keywordsB: ["performance", "misconduct", "absenteeism", "disciplinary action"],
    category: "Labor Law",
    subcategory: "Wrongful Termination",
    claimantLegalReferences: [
      {
        section: "Section 25F",
        act: "Industrial Disputes Act, 1947",
        explanation: "Conditions precedent to retrenchment. Prior notice, compensation, and retrenchment benefits required.",
        relevance: 95,
        category: "Termination",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 25G",
        act: "Industrial Disputes Act, 1947",
        explanation: "Procedure for retrenchment. Last come first go principle and offer of re-employment.",
        relevance: 85,
        category: "Retrenchment",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 2(oo)",
        act: "Industrial Disputes Act, 1947",
        explanation: "Definition of retrenchment. Excludes voluntary retirement and termination for misconduct.",
        relevance: 80,
        category: "Definitions",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 11A",
        act: "Industrial Disputes Act, 1947",
        explanation: "Power of Labour Court to give relief in case of discharge or dismissal of workmen.",
        relevance: 90,
        category: "Relief",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "If termination violated industrial law provisions, employee entitled to reinstatement with back wages or compensation in lieu thereof.",
    ethicalRecommendations: [
      "Follow due process of law for termination",
      "Provide opportunity for defense before disciplinary action",
      "Maintain detailed records of performance and conduct"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "1-3 years",
    costEstimate: "₹25,000 - ₹2,00,000",
    complianceRequirements: [
      "Proper notice period compliance",
      "Severance pay calculation",
      "Clearance of all dues"
    ],
    alternativeResolutions: [
      "Voluntary retirement with enhanced package",
      "Transfer to different department",
      "Extended notice period with training"
    ],
    risks: [
      "Back wage liability",
      "Reinstatement orders",
      "Damage to employer reputation"
    ],
    successProbability: 60,
    limitationPeriod: "1 year from date of termination",
    appealOptions: [
      "Labour Appellate Tribunal",
      "High Court under Article 226"
    ]
  },

  // Property Law - Enhanced
  {
    id: "property_001",
    keywordsA: ["ownership", "title", "property", "land", "possession"],
    keywordsB: ["encroachment", "trespass", "illegal occupation", "adverse possession"],
    category: "Property Law",
    subcategory: "Title Dispute",
    claimantLegalReferences: [
      {
        section: "Section 5",
        act: "Transfer of Property Act, 1882",
        explanation: "Transfer of property defined. Living person to another living person for consideration.",
        relevance: 90,
        category: "Transfer",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 41",
        act: "Transfer of Property Act, 1882",
        explanation: "Transfer by person with defective title. Transferee gets no better title than transferor.",
        relevance: 85,
        category: "Title",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 27",
        act: "Limitation Act, 1963",
        explanation: "Extinguishment of right to property. Adverse possession for 12 years extinguishes owner's title.",
        relevance: 70,
        category: "Limitation",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 6",
        act: "Transfer of Property Act, 1882",
        explanation: "What may be transferred. Property of any kind may be transferred except as restricted.",
        relevance: 80,
        category: "Transferability",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "Verify chain of title and possession records. Rightful owner entitled to possession unless adverse possession established.",
    ethicalRecommendations: [
      "Respect property rights of others",
      "Maintain clear title documents",
      "Avoid forceful dispossession"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "2-5 years",
    costEstimate: "₹1,00,000 - ₹10,00,000",
    complianceRequirements: [
      "Title document verification",
      "Survey and demarcation",
      "Possession proof establishment"
    ],
    alternativeResolutions: [
      "Boundary settlement agreement",
      "Compensation for improvements",
      "Partition if joint ownership"
    ],
    risks: [
      "Lengthy title investigation",
      "Multiple claimants",
      "Enforcement difficulties"
    ],
    successProbability: 55,
    limitationPeriod: "12 years for recovery of property",
    appealOptions: [
      "High Court under Section 100 CPC",
      "Supreme Court if substantial question of law"
    ]
  },

  // Consumer Protection - Enhanced
  {
    id: "consumer_001",
    keywordsA: ["defective", "goods", "product", "faulty", "service deficiency"],
    keywordsB: ["seller", "manufacturer", "retailer", "service provider"],
    category: "Consumer Protection",
    subcategory: "Defective Goods/Services",
    claimantLegalReferences: [
      {
        section: "Section 2(5)",
        act: "Consumer Protection Act, 2019",
        explanation: "Definition of defect in goods. Any fault, imperfection or shortcoming in quality, quantity, potency, purity or standard.",
        relevance: 95,
        category: "Definitions",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 2(11)",
        act: "Consumer Protection Act, 2019",
        explanation: "Definition of deficiency in service. Any fault, imperfection, shortcoming or inadequacy in quality, nature and manner of performance.",
        relevance: 90,
        category: "Service Deficiency",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 86",
        act: "Consumer Protection Act, 2019",
        explanation: "Strict liability for damage caused by defective product. Manufacturer liable without proof of negligence.",
        relevance: 85,
        category: "Product Liability",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 18",
        act: "Consumer Protection Act, 2019",
        explanation: "Rights of consumers including right to be informed, right to choose, right to be heard.",
        relevance: 80,
        category: "Consumer Rights",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "Consumer entitled to replacement, repair, compensation or refund. Manufacturer/seller liable for defective products.",
    ethicalRecommendations: [
      "Provide prompt redressal for consumer complaints",
      "Maintain quality standards in products/services",
      "Ensure transparent pricing and terms"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "3-12 months",
    costEstimate: "₹10,000 - ₹1,00,000",
    complianceRequirements: [
      "Complaint within 2 years of cause of action",
      "Proof of purchase/transaction",
      "Notice to opposite party"
    ],
    alternativeResolutions: [
      "Direct negotiation with seller",
      "Mediation through consumer forum",
      "Product recall if widespread defect"
    ],
    risks: [
      "Difficulty in proving defect",
      "Manufacturer/seller insolvency",
      "Technical evidence requirements"
    ],
    successProbability: 70,
    limitationPeriod: "2 years from date of cause of action",
    appealOptions: [
      "State Consumer Disputes Redressal Commission",
      "National Consumer Disputes Redressal Commission"
    ]
  },

  // Family Law - Enhanced
  {
    id: "family_001",
    keywordsA: ["maintenance", "alimony", "support", "spousal support"],
    keywordsB: ["husband", "wife", "spouse", "divorce", "separation"],
    category: "Family Law",
    subcategory: "Maintenance",
    claimantLegalReferences: [
      {
        section: "Section 125",
        act: "Criminal Procedure Code, 1973",
        explanation: "Order for maintenance of wives, children and parents. Magistrate may order monthly allowance.",
        relevance: 95,
        category: "Maintenance",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 24",
        act: "Hindu Marriage Act, 1955",
        explanation: "Maintenance pendente lite and expenses of proceedings. Court may order payment during proceedings.",
        relevance: 90,
        category: "Interim Relief",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 25",
        act: "Hindu Marriage Act, 1955",
        explanation: "Permanent alimony and maintenance. Court may order payment having regard to circumstances.",
        relevance: 85,
        category: "Permanent Alimony",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 127",
        act: "Criminal Procedure Code, 1973",
        explanation: "Alteration in allowance. Order may be altered or rescinded on proof of change in circumstances.",
        relevance: 80,
        category: "Modification",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "Maintenance should be awarded considering income, needs, and standard of living. Both parties' circumstances to be evaluated.",
    ethicalRecommendations: [
      "Provide truthful financial disclosure",
      "Consider welfare of children primarily",
      "Avoid using maintenance as leverage"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "6 months - 2 years",
    costEstimate: "₹50,000 - ₹3,00,000",
    complianceRequirements: [
      "Income proof and financial statements",
      "Needs assessment documentation",
      "Children's welfare consideration"
    ],
    alternativeResolutions: [
      "Mutual consent settlement",
      "Mediation through family court",
      "Lump sum payment option"
    ],
    risks: [
      "Non-payment enforcement issues",
      "Change in financial circumstances",
      "Multiple forum proceedings"
    ],
    successProbability: 75,
    limitationPeriod: "No limitation for maintenance",
    appealOptions: [
      "Sessions Court appeal",
      "High Court under Article 227"
    ]
  },

  // Intellectual Property - Enhanced
  {
    id: "ip_001",
    keywordsA: ["copyright", "infringement", "plagiarism", "unauthorized use"],
    keywordsB: ["author", "publisher", "distributor", "online platform"],
    category: "Intellectual Property",
    subcategory: "Copyright Infringement",
    claimantLegalReferences: [
      {
        section: "Section 51",
        act: "Copyright Act, 1957",
        explanation: "When copyright infringed. Copyright infringed when person without license does anything author has exclusive right to do.",
        relevance: 95,
        category: "Infringement",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 55",
        act: "Copyright Act, 1957",
        explanation: "Civil remedies for infringement. Owner may seek injunction, damages, and account of profits.",
        relevance: 90,
        category: "Remedies",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 52",
        act: "Copyright Act, 1957",
        explanation: "Certain acts not to be infringement. Fair dealing, criticism, review, news reporting permitted.",
        relevance: 85,
        category: "Fair Use",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 14",
        act: "Copyright Act, 1957",
        explanation: "Meaning of copyright. Exclusive right to do or authorize doing certain acts in relation to work.",
        relevance: 80,
        category: "Rights",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "If infringement established, claimant entitled to injunction, damages, and account of profits. Fair use defense available.",
    ethicalRecommendations: [
      "Respect intellectual property rights",
      "Seek proper licensing for use",
      "Give appropriate attribution"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "1-3 years",
    costEstimate: "₹2,00,000 - ₹15,00,000",
    complianceRequirements: [
      "Copyright registration (optional but helpful)",
      "Proof of originality",
      "Evidence of infringement"
    ],
    alternativeResolutions: [
      "Licensing agreement",
      "Attribution with royalty payment",
      "Voluntary removal of infringing content"
    ],
    risks: [
      "Proving originality and ownership",
      "Calculating damages",
      "Cross-border enforcement issues"
    ],
    successProbability: 60,
    limitationPeriod: "3 years from date of infringement",
    appealOptions: [
      "High Court appeal",
      "Supreme Court if substantial question of law"
    ]
  },

  // Criminal Law - Enhanced
  {
    id: "criminal_001",
    keywordsA: ["theft", "stolen", "robbery", "burglary", "criminal breach of trust"],
    keywordsB: ["accused", "defendant", "property", "victim"],
    category: "Criminal Law",
    subcategory: "Property Crimes",
    claimantLegalReferences: [
      {
        section: "Section 378",
        act: "Indian Penal Code, 1860",
        explanation: "Theft defined. Dishonest taking of movable property out of possession of another without consent.",
        relevance: 95,
        category: "Theft",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 405",
        act: "Indian Penal Code, 1860",
        explanation: "Criminal breach of trust. Dishonest misappropriation or conversion of property entrusted.",
        relevance: 85,
        category: "Breach of Trust",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 79",
        act: "Indian Penal Code, 1860",
        explanation: "Act done by person justified by law. Nothing is offense which is done by person justified by law.",
        relevance: 70,
        category: "Justification",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 81",
        act: "Indian Penal Code, 1860",
        explanation: "Act likely to cause harm but done in good faith. Protection for bona fide acts.",
        relevance: 60,
        category: "Good Faith",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "If theft/criminal breach proven beyond reasonable doubt, accused liable for punishment and restitution to victim.",
    ethicalRecommendations: [
      "Cooperate with law enforcement",
      "Provide truthful testimony",
      "Respect presumption of innocence"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "6 months - 3 years",
    costEstimate: "₹50,000 - ₹5,00,000",
    complianceRequirements: [
      "FIR registration",
      "Evidence collection and preservation",
      "Witness statement recording"
    ],
    alternativeResolutions: [
      "Plea bargaining under CrPC",
      "Compounding of offences if permitted",
      "Mediation through Lok Adalat"
    ],
    risks: [
      "Burden of proof beyond reasonable doubt",
      "Witness reliability issues",
      "Procedural compliance requirements"
    ],
    successProbability: 65,
    limitationPeriod: "3 years for filing complaint",
    appealOptions: [
      "Sessions Court appeal",
      "High Court under CrPC provisions"
    ]
  },

  // Environmental Law - Enhanced
  {
    id: "env_001",
    keywordsA: ["pollution", "environment", "waste", "contamination", "environmental damage"],
    keywordsB: ["factory", "industry", "municipality", "company", "development"],
    category: "Environmental Law",
    subcategory: "Pollution Control",
    claimantLegalReferences: [
      {
        section: "Section 5",
        act: "Environment Protection Act, 1986",
        explanation: "Power to give directions. Central Government may give directions to any person for compliance.",
        relevance: 95,
        category: "Enforcement",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 15",
        act: "Environment Protection Act, 1986",
        explanation: "Penalty for contravention. Imprisonment up to 5 years and fine up to one lakh rupees.",
        relevance: 90,
        category: "Penalties",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 21",
        act: "Water (Prevention and Control of Pollution) Act, 1974",
        explanation: "Prohibition on use of stream or well for disposal of polluting matter without consent.",
        relevance: 85,
        category: "Water Pollution",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 7",
        act: "Air (Prevention and Control of Pollution) Act, 1981",
        explanation: "Power of State Board to declare air pollution control areas.",
        relevance: 80,
        category: "Air Pollution",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "Polluters must cease harmful activities, remediate damage, and compensate affected parties. Strict liability applies.",
    ethicalRecommendations: [
      "Adopt sustainable and eco-friendly practices",
      "Conduct environmental impact assessments",
      "Implement pollution control measures"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "1-4 years",
    costEstimate: "₹2,00,000 - ₹20,00,000",
    complianceRequirements: [
      "Environmental clearance certificates",
      "Pollution control board approvals",
      "Regular monitoring and reporting"
    ],
    alternativeResolutions: [
      "Voluntary pollution control measures",
      "Environmental restoration fund contribution",
      "Technology upgradation for cleaner production"
    ],
    risks: [
      "Ongoing environmental monitoring requirements",
      "Public interest litigation exposure",
      "Reputation and business impact"
    ],
    successProbability: 70,
    limitationPeriod: "Continuing cause of action",
    appealOptions: [
      "National Green Tribunal",
      "High Court under Article 226"
    ]
  },

  // Cyber Law - Enhanced
  {
    id: "cyber_001",
    keywordsA: ["cybercrime", "hacking", "phishing", "data breach", "online fraud"],
    keywordsB: ["user", "victim", "account", "website", "digital platform"],
    category: "Cyber Law",
    subcategory: "Cyber Crimes",
    claimantLegalReferences: [
      {
        section: "Section 43",
        act: "Information Technology Act, 2000",
        explanation: "Penalty for damage to computer system. Compensation up to one crore rupees for damages.",
        relevance: 95,
        category: "Computer Crimes",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 66",
        act: "Information Technology Act, 2000",
        explanation: "Computer related offences. Imprisonment up to 3 years and fine up to 2 lakh rupees.",
        relevance: 90,
        category: "Penalties",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 79",
        act: "Information Technology Act, 2000",
        explanation: "Exemption from liability of intermediary. Safe harbor provision for intermediaries.",
        relevance: 80,
        category: "Intermediary Liability",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 69",
        act: "Information Technology Act, 2000",
        explanation: "Power to issue directions for interception or monitoring. Government powers in cybersecurity.",
        relevance: 75,
        category: "Government Powers",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "Victims entitled to compensation for damages. Cybercriminals liable for imprisonment and fine. Platform liability depends on compliance.",
    ethicalRecommendations: [
      "Implement robust cybersecurity measures",
      "Report cybercrimes promptly to authorities",
      "Maintain user data privacy and security"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "6 months - 2 years",
    costEstimate: "₹1,00,000 - ₹10,00,000",
    complianceRequirements: [
      "FIR registration with cyber cell",
      "Digital evidence preservation",
      "Forensic analysis reports"
    ],
    alternativeResolutions: [
      "Platform-based dispute resolution",
      "Voluntary compensation by platform",
      "Content removal and account restoration"
    ],
    risks: [
      "Cross-border jurisdiction issues",
      "Technical evidence complexity",
      "Rapid technology evolution"
    ],
    successProbability: 55,
    limitationPeriod: "3 years from date of incident",
    appealOptions: [
      "High Court appeal",
      "Supreme Court under Article 136"
    ]
  },

  // Banking Law - Enhanced
  {
    id: "banking_001",
    keywordsA: ["loan", "default", "recovery", "NPA", "banking dispute"],
    keywordsB: ["bank", "financial institution", "borrower", "guarantor"],
    category: "Banking Law",
    subcategory: "Loan Recovery",
    claimantLegalReferences: [
      {
        section: "Section 13",
        act: "Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002",
        explanation: "Enforcement of security interest. Secured creditor may enforce security without court intervention.",
        relevance: 95,
        category: "Security Enforcement",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 19",
        act: "Recovery of Debts and Bankruptcy Act, 1993",
        explanation: "Application to Debt Recovery Tribunal. Banks may approach DRT for recovery above 20 lakhs.",
        relevance: 90,
        category: "Debt Recovery",
        lastUpdated: "2024-01-15"
      }
    ],
    respondentLegalReferences: [
      {
        section: "Section 17",
        act: "Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002",
        explanation: "Objection to measures taken by secured creditor. Borrower may approach DRT within 45 days.",
        relevance: 85,
        category: "Borrower Rights",
        lastUpdated: "2024-01-15"
      },
      {
        section: "Section 138",
        act: "Negotiable Instruments Act, 1881",
        explanation: "Dishonour of cheque for insufficiency of funds. Criminal liability for cheque bounce.",
        relevance: 80,
        category: "Cheque Bounce",
        lastUpdated: "2024-01-15"
      }
    ],
    suggestedResolution: "Bank entitled to recover dues through legal process. Borrower rights to fair hearing and proper procedure to be protected.",
    ethicalRecommendations: [
      "Provide adequate notice before enforcement",
      "Follow prescribed legal procedures",
      "Consider borrower's financial difficulties"
    ],
    jurisdiction: ["All India"],
    timelineEstimate: "1-3 years",
    costEstimate: "₹2,00,000 - ₹20,00,000",
    complianceRequirements: [
      "Proper loan documentation",
      "Security interest registration",
      "Due process compliance"
    ],
    alternativeResolutions: [
      "One-time settlement schemes",
      "Restructuring of loan terms",
      "Corporate insolvency resolution process"
    ],
    risks: [
      "Asset depreciation during recovery",
      "Lengthy legal procedures",
      "Borrower's financial insolvency"
    ],
    successProbability: 70,
    limitationPeriod: "3 years from date of default",
    appealOptions: [
      "Debt Recovery Appellate Tribunal",
      "High Court under Article 226"
    ]
  }
];

// Enhanced Panchayat System with detailed perspectives
const PANCHAYAT_PERSPECTIVES = [
  {
    name: "Panch Nyayamurti (Justice-Oriented)",
    philosophy: "Strict adherence to legal principles and precedents",
    weight: 1.0,
    empathy: 0.3,
    process: 0.9,
    innovation: 0.4,
    focus: ["criminal", "constitutional", "company"],
    bias: "legal_precedent",
    expertise: ["Criminal Law", "Constitutional Law", "Company Law"]
  },
  {
    name: "Panch Karuna (Compassion-Oriented)",
    philosophy: "Emphasizes human welfare and equitable solutions",
    weight: 0.6,
    empathy: 1.0,
    process: 0.5,
    innovation: 0.7,
    focus: ["family", "human rights", "consumer"],
    bias: "humanitarian",
    expertise: ["Family Law", "Human Rights", "Consumer Protection"]
  },
  {
    name: "Panch Samaj (Community-Oriented)",
    philosophy: "Focuses on social harmony and community welfare",
    weight: 0.7,
    empathy: 0.8,
    process: 0.6,
    innovation: 0.6,
    focus: ["property", "environmental", "administrative"],
    bias: "community_welfare",
    expertise: ["Property Law", "Environmental Law", "Administrative Law"]
  },
  {
    name: "Panch Vidhi (Procedure-Oriented)",
    philosophy: "Emphasizes proper legal procedure and due process",
    weight: 0.8,
    empathy: 0.4,
    process: 1.0,
    innovation: 0.3,
    focus: ["banking", "tax", "commercial"],
    bias: "procedural_compliance",
    expertise: ["Banking Law", "Tax Law", "Commercial Law"]
  },
  {
    name: "Panch Pragati (Progressive-Oriented)",
    philosophy: "Adopts modern interpretations and technological solutions",
    weight: 0.5,
    empathy: 0.7,
    process: 0.7,
    innovation: 1.0,
    focus: ["cyber", "intellectual property", "arbitration"],
    bias: "progressive_interpretation",
    expertise: ["Cyber Law", "Intellectual Property", "Arbitration"]
  },
  {
    name: "Panch Vishwas (Trust-Oriented)",
    philosophy: "Impartial, unbiased, and trust-building approach to dispute resolution.",
    weight: 0.7,
    empathy: 0.7,
    process: 0.7,
    innovation: 0.7,
    focus: ["all"],
    bias: "no_bias",
    expertise: [
      "Contract Law", "Labor Law", "Property Law", "Consumer Protection", "Family Law", "Intellectual Property", "Criminal Law", "Environmental Law", "Tax Law", "Company Law", "Cyber Law", "Human Rights", "Administrative Law", "Banking Law", "Insurance Law", "Constitutional Law", "Commercial Law", "Arbitration", "Alternative Dispute Resolution"
    ]
  }
];

// Enhanced analysis function
function enhancedRuleBasedAnalysis(partyAArgs: string[], partyBArgs: string[]): AnalysisResult {
  const allArgs = [...partyAArgs, ...partyBArgs].join(" ").toLowerCase();
  
  // Find matching rules
  const matchingRules = ENHANCED_DISPUTE_RULES.filter(rule => {
    const keywordCount = [...rule.keywordsA, ...rule.keywordsB]
      .filter(keyword => allArgs.includes(keyword.toLowerCase())).length;
    return keywordCount >= 2;
  });

  // Default fallback rule
  const defaultRule = ENHANCED_DISPUTE_RULES[0];
  const bestRule = matchingRules.length > 0 ? matchingRules[0] : defaultRule;

  const confidenceScore = matchingRules.length > 0 ? 
    Math.min(95, 60 + (matchingRules.length * 10)) : 40;

  return {
    claimantLegalReferences: bestRule.claimantLegalReferences,
    respondentLegalReferences: bestRule.respondentLegalReferences,
    suggestedResolution: bestRule.suggestedResolution,
    ethicalRecommendations: bestRule.ethicalRecommendations,
    confidenceScore,
    alternativeResolutions: bestRule.alternativeResolutions,
    timelineEstimate: bestRule.timelineEstimate,
    costEstimate: bestRule.costEstimate,
    successProbability: bestRule.successProbability,
    risks: bestRule.risks,
    complianceRequirements: bestRule.complianceRequirements,
    jurisdiction: bestRule.jurisdiction.join(", "),
    applicableLaws: bestRule.claimantLegalReferences.map(ref => ref.act),
    limitationPeriod: bestRule.limitationPeriod,
    appealOptions: bestRule.appealOptions,
    matchedKeywords: [...bestRule.keywordsA, ...bestRule.keywordsB]
      .filter(keyword => allArgs.includes(keyword.toLowerCase())),
    matchStrength: matchingRules.length >= 3 ? "Strong" : 
                   matchingRules.length >= 2 ? "Moderate" : "Weak"
  };
}

// Enhanced Panchayat analysis with perspective-based reasoning
function enhancedPanchayatAnalysis(partyAArgs: string[], partyBArgs: string[]): AnalysisResult[] {
  const baseAnalysis = enhancedRuleBasedAnalysis(partyAArgs, partyBArgs);
  
  return PANCHAYAT_PERSPECTIVES.map(panch => {
    let modifiedAnalysis = { ...baseAnalysis };
    
    // Apply perspective-based modifications
    if (panch.empathy > 0.8) {
      modifiedAnalysis.suggestedResolution += ` (${panch.name} emphasizes compassionate resolution considering human impact)`;
      modifiedAnalysis.ethicalRecommendations.push("Prioritize human welfare and dignity in resolution");
    }
    
    if (panch.process > 0.9) {
      modifiedAnalysis.suggestedResolution += ` (${panch.name} stresses strict adherence to legal procedures)`;
      modifiedAnalysis.ethicalRecommendations.push("Ensure all procedural requirements are meticulously followed");
    }
    
    if (panch.innovation > 0.8) {
      modifiedAnalysis.suggestedResolution += ` (${panch.name} suggests modern, technology-enabled solutions)`;
      modifiedAnalysis.ethicalRecommendations.push("Embrace innovative approaches while respecting legal framework");
    }

    if (panch.bias === 'no_bias') {
      modifiedAnalysis.suggestedResolution += ` (${panch.name} emphasizes impartial and unbiased resolution)`;
      modifiedAnalysis.ethicalRecommendations.push("Maintain strict neutrality and impartiality in analysis");
    }
    
    // Adjust confidence based on expertise
    if (panch.expertise.some(exp => modifiedAnalysis.applicableLaws.some(law => law.includes(exp)))) {
      modifiedAnalysis.confidenceScore = Math.min(95, modifiedAnalysis.confidenceScore + 10);
    }
    
    modifiedAnalysis.panchName = panch.name;
    
    return modifiedAnalysis;
  });
}

// Main component
export function DisputeResolution() {
  const [cases, setCases] = useState<DisputeCase[]>([])
  const [selectedCase, setSelectedCase] = useState<DisputeCase | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<DisputeCategory | "">("")
  const [disputeTitle, setDisputeTitle] = useState("")
  const [disputeDescription, setDisputeDescription] = useState("")
  const [partyAInfo, setPartyAInfo] = useState<Partial<PartyInfo>>({
    name: "",
    type: "Individual",
    address: "",
    phone: "",
    email: ""
  })
  const [partyBInfo, setPartyBInfo] = useState<Partial<PartyInfo>>({
    name: "",
    type: "Individual", 
    address: "",
    phone: "",
    email: ""
  })
  const [partyAArguments, setPartyAArguments] = useState<string[]>(["", "", ""])
  const [partyBArguments, setPartyBArguments] = useState<string[]>(["", "", ""])
  const [analyzing, setAnalyzing] = useState(false)
  const [panchayatResults, setPanchayatResults] = useState<AnalysisResult[] | null>(null)
  const [activeTab, setActiveTab] = useState("new-case")
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false)
  const [selectedPanchayat, setSelectedPanchayat] = useState<string>('Consensus');

  const handleCreateCase = () => {
    if (!disputeTitle || !disputeDescription || !partyAInfo.name || !partyBInfo.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to create a case.",
        variant: "destructive",
      })
      return
    }

    const newCase: DisputeCase = {
      id: Date.now().toString(),
      title: disputeTitle,
      status: "Pending",
      priority: "Medium",
      partyA: partyAInfo as PartyInfo,
      partyB: partyBInfo as PartyInfo,
      description: disputeDescription,
      category: selectedCategory as DisputeCategory,
      currency: "INR",
      filingDate: new Date().toISOString().split('T')[0],
      location: "Online",
      messages: [],
      documents: [],
      timeline: [{
        date: new Date().toISOString().split('T')[0],
        event: "Case Filed",
        description: "Dispute case created in AI Panchayat system",
        type: "filing"
      }],
      jurisdiction: "All India",
      language: "English",
      isPublic: false,
      evidence: [],
      complianceChecks: []
    }

    setCases([...cases, newCase])
    setSelectedCase(newCase)
    setActiveTab("analysis")
    
    toast({
      title: "Case Created",
      description: "Your dispute case has been successfully created.",
    })
  }

  const handleAnalyzeDispute = async () => {
    if (!selectedCase) {
      toast({
        title: "No Case Selected",
        description: "Please create or select a case first.",
        variant: "destructive",
      })
      return
    }

    if (partyAArguments.some(arg => !arg.trim()) || partyBArguments.some(arg => !arg.trim())) {
      toast({
        title: "Incomplete Arguments",
        description: "Please provide all three arguments for both parties.",
        variant: "destructive",
      })
      return
    }

    setAnalyzing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate processing
      
      const results = enhancedPanchayatAnalysis(partyAArguments, partyBArguments)
      setPanchayatResults(results)
      
      toast({
        title: "AI Panchayat Analysis Complete",
        description: "The Panchayat has completed its deliberation and reached conclusions.",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the dispute. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const getPanchayatConsensus = (results: AnalysisResult[] | null) => {
    if (!results || results.length === 0) return null
    
    const resolutions = results.map(r => r.suggestedResolution.split('(')[0].trim())
    const resolutionCounts: Record<string, number> = {}
    
    resolutions.forEach(res => {
      resolutionCounts[res] = (resolutionCounts[res] || 0) + 1
    })
    
    const maxVotes = Math.max(...Object.values(resolutionCounts))
    const consensus = Object.entries(resolutionCounts)
      .filter(([_, count]) => count === maxVotes)
      .map(([res]) => res)
    
    return consensus.length === 1 ? consensus[0] : `Split Decision: ${consensus.join(" | ")}`
  }

  const getAverageConfidence = (results: AnalysisResult[] | null) => {
    if (!results || results.length === 0) return 0
    return Math.round(results.reduce((sum, r) => sum + r.confidenceScore, 0) / results.length)
  }

  const resetPanchayat = () => {
    setPartyAArguments(["", "", ""])
    setPartyBArguments(["", "", ""])
    setPanchayatResults(null)
    setDisputeTitle("")
    setDisputeDescription("")
    setPartyAInfo({ name: "", type: "Individual", address: "", phone: "", email: "" })
    setPartyBInfo({ name: "", type: "Individual", address: "", phone: "", email: "" })
    setSelectedCategory("")
    setSelectedCase(null)
    setActiveTab("new-case")
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 dark:border-[#c7a44a]/20 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white">
            <Scale className="h-6 w-6 text-primary dark:text-[#c7a44a]" />
            AI Panchayat System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <CheckCircle className="h-3 w-3 mr-1" />
                Indian Law Compliant
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Shield className="h-3 w-3 mr-1" />
                Secure & Confidential
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                <Award className="h-3 w-3 mr-1" />
                AI-Powered Analysis
              </Badge>
            </div>
            {/* Panchayat Perspective Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium dark:text-gray-200">Panchayat:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="min-w-[160px] text-left dark:bg-gray-800 dark:text-white">
                    {selectedPanchayat}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onSelect={() => setSelectedPanchayat('Consensus')}>Consensus</DropdownMenuItem>
                  {PANCHAYAT_PERSPECTIVES.map((panch) => (
                    <DropdownMenuItem key={panch.name} onSelect={() => setSelectedPanchayat(panch.name)}>
                      {panch.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* Navigation Tabs */}
          <div className="w-full">
            <div className="grid w-full grid-cols-4 bg-white">
              <button className={`flex items-center gap-2 p-2 ${activeTab === "new-case" ? "font-bold" : ""}`} onClick={() => setActiveTab("new-case")}> <FileText className="h-4 w-4" /> New Case </button>
              <button className={`flex items-center gap-2 p-2 ${activeTab === "analysis" ? "font-bold" : ""}`} onClick={() => setActiveTab("analysis")}> <Scale className="h-4 w-4" /> Analysis </button>
              <button className={`flex items-center gap-2 p-2 ${activeTab === "results" ? "font-bold" : ""}`} onClick={() => setActiveTab("results")}> <Users className="h-4 w-4" /> Results </button>
              <button className={`flex items-center gap-2 p-2 ${activeTab === "history" ? "font-bold" : ""}`} onClick={() => setActiveTab("history")}> <Clock className="h-4 w-4" /> History </button>
            </div>
            {activeTab === "new-case" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Create New Dispute Case
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dispute-title">Case Title *</Label>
                        <Input
                          id="dispute-title"
                          placeholder="e.g., Contract Breach - Payment Dispute"
                          value={disputeTitle}
                          onChange={(e) => setDisputeTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dispute-category">Dispute Category *</Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full text-left">
                              {selectedCategory || "Select dispute category"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {["Contract Law","Labor Law","Property Law","Consumer Protection","Family Law","Intellectual Property","Criminal Law","Environmental Law","Banking Law","Cyber Law"].map(cat => (
                              <DropdownMenuItem key={cat} onSelect={() => setSelectedCategory(cat as DisputeCategory)}>
                                {cat}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dispute-description">Case Description *</Label>
                      <Textarea
                        id="dispute-description"
                        placeholder="Provide detailed description of the dispute..."
                        value={disputeDescription}
                        onChange={(e) => setDisputeDescription(e.target.value)}
                        className="h-32"
                      />
                    </div>
                  </div>

                  <div className="my-4 border-t" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Party A Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-600">Claimant Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Name *</Label>
                          <Input
                            placeholder="Full name"
                            value={partyAInfo.name}
                            onChange={(e) => setPartyAInfo({...partyAInfo, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <select
                            value={partyAInfo.type}
                            onChange={e => setPartyAInfo({ ...partyAInfo, type: e.target.value as PartyInfo['type'] })}
                            className="w-full border rounded p-2"
                          >
                            <option value="Individual">Individual</option>
                            <option value="Company">Company</option>
                            <option value="Organization">Organization</option>
                            <option value="Government">Government</option>
                          </select>
                        </div>
                        <div>
                          <Label>Address</Label>
                          <Input
                            placeholder="Complete address"
                            value={partyAInfo.address}
                            onChange={(e) => setPartyAInfo({...partyAInfo, address: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Phone</Label>
                            <Input
                              placeholder="Phone number"
                              value={partyAInfo.phone}
                              onChange={(e) => setPartyAInfo({...partyAInfo, phone: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input
                              placeholder="Email address"
                              value={partyAInfo.email}
                              onChange={(e) => setPartyAInfo({...partyAInfo, email: e.target.value})}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Party B Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-red-600">Respondent Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Name *</Label>
                          <Input
                            placeholder="Full name"
                            value={partyBInfo.name}
                            onChange={(e) => setPartyBInfo({...partyBInfo, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <select
                            value={partyBInfo.type}
                            onChange={e => setPartyBInfo({ ...partyBInfo, type: e.target.value as PartyInfo['type'] })}
                            className="w-full border rounded p-2"
                          >
                            <option value="Individual">Individual</option>
                            <option value="Company">Company</option>
                            <option value="Organization">Organization</option>
                            <option value="Government">Government</option>
                          </select>
                        </div>
                        <div>
                          <Label>Address</Label>
                          <Input
                            placeholder="Complete address"
                            value={partyBInfo.address}
                            onChange={(e) => setPartyBInfo({...partyBInfo, address: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Phone</Label>
                            <Input
                              placeholder="Phone number"
                              value={partyBInfo.phone}
                              onChange={(e) => setPartyBInfo({...partyBInfo, phone: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input
                              placeholder="Email address"
                              value={partyBInfo.email}
                              onChange={(e) => setPartyBInfo({...partyBInfo, email: e.target.value})}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      onClick={handleCreateCase}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Create Case & Proceed to Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            {activeTab === "analysis" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Present Arguments to AI Panchayat
                  </CardTitle>
                  {selectedCase && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{selectedCase.category}</Badge>
                      <Badge variant="outline">{selectedCase.status}</Badge>
                      <Badge variant="outline">{selectedCase.priority} Priority</Badge>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {!selectedCase ? (
                    <div className="bg-yellow-100 text-yellow-800 p-2 rounded">
                      Please create a case first before proceeding to analysis.
                    </div>
                  ) : (
                    <>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">{selectedCase.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{selectedCase.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-blue-600">Claimant:</span> {selectedCase.partyA.name}
                          </div>
                          <div>
                            <span className="font-medium text-red-600">Respondent:</span> {selectedCase.partyB.name}
                          </div>
                        </div>
                      </div>

                      {[0, 1, 2].map((index) => (
                        <div key={index} className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Statement {index + 1}</Badge>
                            <span className="text-sm text-gray-500">
                              {index === 0 ? "Opening Statement" : index === 1 ? "Supporting Evidence" : "Concluding Argument"}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-blue-600 font-medium">
                                Claimant's {index === 0 ? "Opening Statement" : index === 1 ? "Supporting Evidence" : "Concluding Argument"}
                              </Label>
                              <Textarea
                                value={partyAArguments[index]}
                                onChange={(e) => {
                                  const newArgs = [...partyAArguments]
                                  newArgs[index] = e.target.value
                                  setPartyAArguments(newArgs)
                                }}
                                placeholder={`Present your ${index === 0 ? "opening statement" : index === 1 ? "supporting evidence" : "concluding argument"}...`}
                                className="h-32 border-blue-200 focus:border-blue-400"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-red-600 font-medium">
                                Respondent's {index === 0 ? "Opening Statement" : index === 1 ? "Supporting Evidence" : "Concluding Argument"}
                              </Label>
                              <Textarea
                                value={partyBArguments[index]}
                                onChange={(e) => {
                                  const newArgs = [...partyBArguments]
                                  newArgs[index] = e.target.value
                                  setPartyBArguments(newArgs)
                                }}
                                placeholder={`Present your ${index === 0 ? "opening statement" : index === 1 ? "supporting evidence" : "concluding argument"}...`}
                                className="h-32 border-red-200 focus:border-red-400"
                              />
                            </div>
                          </div>
                          {index < 2 && <div className="my-4 border-t" />}
                        </div>
                      ))}

                      <div className="flex justify-center gap-4">
                        <Button 
                          onClick={handleAnalyzeDispute} 
                          disabled={analyzing}
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          {analyzing ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Panchayat Deliberating...
                            </>
                          ) : (
                            <>
                              <Scale className="mr-2 h-5 w-5" />
                              Submit to AI Panchayat
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={resetPanchayat}
                          size="lg"
                        >
                          Reset All
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
            {activeTab === "results" && (
              <Card className="border-primary/20 dark:border-[#c7a44a]/20 dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Users className="h-5 w-5" />
                    Panchayat Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {panchayatResults ? (
                    <div className="space-y-6">
                      {/* Consensus Summary */}
                      <Card className="border-green-200 bg-green-50 dark:bg-green-900/30">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                            <Award className="h-5 w-5" />
                            Panchayat Consensus Decision
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
                              <p className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">Final Resolution:</p>
                              <p className="text-gray-700 dark:text-gray-100">{getPanchayatConsensus(panchayatResults)}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
                                <div className="text-sm text-green-600 font-medium">Confidence Level</div>
                                <div className="text-2xl font-bold text-green-800 dark:text-green-200">{getAverageConfidence(panchayatResults)}%</div>
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
                                <div className="text-sm text-green-600 font-medium">Timeline Estimate</div>
                                <div className="text-lg font-semibold text-green-800 dark:text-green-200">
                                  {panchayatResults[0]?.timelineEstimate || "6-18 months"}
                                </div>
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
                                <div className="text-sm text-green-600 font-medium">Cost Estimate</div>
                                <div className="text-lg font-semibold text-green-800 dark:text-green-200">
                                  {panchayatResults[0]?.costEstimate || "₹50,000 - ₹5,00,000"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      {/* Individual Panch Analysis */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {(selectedPanchayat === 'Consensus'
                          ? panchayatResults
                          : panchayatResults.filter(r => r.panchName === selectedPanchayat)
                        ).map((result, idx) => (
                          <Card key={idx} className="border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-lg dark:text-white">
                                <Users className="h-5 w-5" />
                                {result.panchName}
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  Confidence: {result.confidenceScore}%
                                </Badge>
                                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30">
                                  {result.matchStrength} Match
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Suggested Resolution:</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                  {result.suggestedResolution}
                                </p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-blue-600 mb-2">Claimant's Legal Basis:</h4>
                                  <div className="space-y-2">
                                    {result.claimantLegalReferences.map((ref, i) => (
                                      <div key={i} className="text-xs bg-blue-50 p-2 rounded border-l-2 border-blue-400">
                                        <div className="font-medium text-blue-800">{ref.section}, {ref.act}</div>
                                        <div className="text-blue-700 mt-1">{ref.explanation}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-red-600 mb-2">Respondent's Legal Basis:</h4>
                                  <div className="space-y-2">
                                    {result.respondentLegalReferences.map((ref, i) => (
                                      <div key={i} className="text-xs bg-red-50 p-2 rounded border-l-2 border-red-400">
                                        <div className="font-medium text-red-800">{ref.section}, {ref.act}</div>
                                        <div className="text-red-700 mt-1">{ref.explanation}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-purple-600 mb-2">Ethical Recommendations:</h4>
                                <ul className="text-sm space-y-1">
                                  {result.ethicalRecommendations.map((rec, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700">{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                                className="w-full"
                              >
                                {showDetailedAnalysis ? (
                                  <>
                                    <ChevronUp className="h-4 w-4 mr-2" />
                                    Hide Detailed Analysis
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-4 w-4 mr-2" />
                                    Show Detailed Analysis
                                  </>
                                )}
                              </Button>

                              {showDetailedAnalysis && (
                                <div className="space-y-4 border-t pt-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h5 className="font-semibold text-gray-700 mb-2">Risk Assessment:</h5>
                                      <ul className="text-xs space-y-1">
                                        {result.risks.map((risk, i) => (
                                          <li key={i} className="flex items-start gap-2">
                                            <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-600">{risk}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div>
                                      <h5 className="font-semibold text-gray-700 mb-2">Success Probability:</h5>
                                      <div className="flex items-center gap-2">
                                        <Progress value={result.successProbability} className="flex-1" />
                                        <span className="text-sm font-medium">{result.successProbability}%</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-700 mb-2">Alternative Resolutions:</h5>
                                    <ul className="text-xs space-y-1">
                                      {result.alternativeResolutions.map((alt, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <ArrowRight className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                          <span className="text-gray-600">{alt}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-700 mb-2">Compliance Requirements:</h5>
                                    <ul className="text-xs space-y-1">
                                      {result.complianceRequirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <Shield className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                          <span className="text-gray-600">{req}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h5 className="font-semibold text-gray-700 mb-2">Limitation Period:</h5>
                                      <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                                        {result.limitationPeriod}
                                      </p>
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-gray-700 mb-2">Appeal Options:</h5>
                                      <ul className="text-xs space-y-1">
                                        {result.appealOptions.map((option, i) => (
                                          <li key={i} className="text-gray-600">• {option}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-12">
                        <div className="text-center space-y-4">
                          <Scale className="h-16 w-16 text-gray-400 mx-auto" />
                          <h3 className="text-xl font-semibold text-gray-600">No Analysis Available</h3>
                          <p className="text-gray-500">Please complete the analysis in the previous tab to view results.</p>
                          <Button 
                            onClick={() => setActiveTab("analysis")}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Go to Analysis
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            )}
            {activeTab === "history" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Case History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cases.length > 0 ? (
                    <div className="space-y-4">
                      {cases.map((case_item) => (
                        <Card key={case_item.id} className="border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-800">{case_item.title}</h4>
                              <Badge 
                                variant={case_item.status === "Resolved" ? "default" : "secondary"}
                                className={
                                  case_item.status === "Resolved" ? "bg-green-100 text-green-800" :
                                  case_item.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {case_item.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{case_item.description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>Filed: {case_item.filingDate}</span>
                              <span>{case_item.partyA.name} vs {case_item.partyB.name}</span>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedCase(case_item)
                                  setActiveTab("results")
                                }}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View Details
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No Cases Yet</h3>
                      <p className="text-gray-500 mb-4">You haven't created any dispute cases yet.</p>
                      <Button 
                        onClick={() => setActiveTab("new-case")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Create First Case
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
  
