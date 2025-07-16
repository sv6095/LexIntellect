# LexIntellect

LexIntellect is an AI-powered legal analysis and AI Panchayat system for dispute resolution. It provides advanced tools for legal document analysis, predictive analytics, and a unique AI-driven Panchayat system that simulates diverse legal perspectives to resolve disputes fairly and transparently.

## Features

- **AI Legal Document Analysis:** Upload and analyze legal documents for insights and predictions.
- **AI Panchayat System:** Present disputes to a virtual panel of AI Panchayat members, each representing a distinct legal philosophy, for multi-perspective analysis and consensus-driven resolutions.
- **Community Forums:** Engage with a legal community for discussions and advice.
- **Predictive Analytics:** Get outcome predictions for legal cases.
- **User Dashboard:** Personalized dashboard for managing documents, disputes, and analysis history.

## What is the AI Panchayat System?

The AI Panchayat System is inspired by traditional Indian village councils (Panchayats) and modernized with AI. When a dispute is submitted, it is analyzed by multiple AI "Panchayat Members," each embodying a unique legal or ethical perspective:

- **Panch Nyayamurti (Justice-Oriented):** Focuses on legal principles and precedents.
- **Panch Karuna (Compassion-Oriented):** Emphasizes human welfare and equitable solutions.
- **Panch Samaj (Community-Oriented):** Prioritizes social harmony and community welfare.
- **Panch Vidhi (Procedure-Oriented):** Stresses proper legal procedure and due process.
- **Panch Pragati (Progressive-Oriented):** Adopts modern, innovative, and technological solutions.
- **Panch Vishwas (Trust-Oriented):** Ensures impartial, unbiased, and trust-building resolutions.

Each member provides an independent analysis and suggested resolution. The system then synthesizes these perspectives to offer a consensus decision, along with confidence scores and ethical recommendations.

## Folder Structure

```
LexIntellect/
  ├── backend/         # FastAPI backend for AI and data processing
  │   ├── app.py
  │   └── requirements.txt
  ├── Frontend/        # Next.js/React frontend application
  │   ├── app/
  │   ├── components/
  │   ├── hooks/
  │   ├── lib/
  │   ├── services/
  │   └── types/
  ├── README.md
  └── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python 3.8+
- npm or yarn
- (Optional) Virtual environment for Python

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   uvicorn app:app --reload
   ```

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Backend:** FastAPI, Python
- **AI/ML:** Google Generative AI (Gemini), Transformers, Sentence Transformers, BM25, FAISS
- **Other:** RESTful APIs, Community features

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.
