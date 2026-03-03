import React, { useState } from 'react';
import { Heart, Activity, Brain, AlertTriangle, CheckCircle, TrendingUp, Shield, Stethoscope, ChevronRight, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Symptom {
  id: string;
  label: string;
  category: string;
}

interface SymptomResult {
  condition: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  action: string;
}

interface VitalReading {
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'caution' | 'high';
  trend: 'up' | 'down' | 'stable';
}

// ─── Symptom Checker Data ─────────────────────────────────────────────────────

const SYMPTOMS: Symptom[] = [
  { id: 'fever', label: 'Fever / High Temperature', category: 'General' },
  { id: 'cough', label: 'Cough (Dry or Wet)', category: 'Respiratory' },
  { id: 'breathlessness', label: 'Shortness of Breath', category: 'Respiratory' },
  { id: 'chest_pain', label: 'Chest Pain or Tightness', category: 'Cardiac' },
  { id: 'headache', label: 'Headache', category: 'Neurological' },
  { id: 'fatigue', label: 'Fatigue / Weakness', category: 'General' },
  { id: 'nausea', label: 'Nausea / Vomiting', category: 'Digestive' },
  { id: 'abdominal_pain', label: 'Abdominal Pain', category: 'Digestive' },
  { id: 'dizziness', label: 'Dizziness / Vertigo', category: 'Neurological' },
  { id: 'joint_pain', label: 'Joint or Muscle Pain', category: 'Musculoskeletal' },
  { id: 'skin_rash', label: 'Skin Rash or Itching', category: 'Dermatological' },
  { id: 'sore_throat', label: 'Sore Throat', category: 'ENT' },
  { id: 'runny_nose', label: 'Runny Nose / Congestion', category: 'ENT' },
  { id: 'back_pain', label: 'Back Pain', category: 'Musculoskeletal' },
  { id: 'palpitations', label: 'Heart Palpitations', category: 'Cardiac' },
  { id: 'swelling', label: 'Swelling in Legs / Feet', category: 'Vascular' },
  { id: 'frequent_urination', label: 'Frequent Urination', category: 'Urological' },
  { id: 'blurred_vision', label: 'Blurred Vision', category: 'Ophthalmological' },
];

function analyzeSymptoms(selected: string[]): SymptomResult {
  const hasCardiac = selected.includes('chest_pain') || selected.includes('palpitations');
  const hasRespiratory = selected.includes('breathlessness') || selected.includes('cough');
  const hasFever = selected.includes('fever');
  const hasNeurological = selected.includes('headache') || selected.includes('dizziness') || selected.includes('blurred_vision');
  const hasDiabetic = selected.includes('frequent_urination') || selected.includes('blurred_vision') || selected.includes('fatigue');

  if (hasCardiac && (selected.includes('breathlessness') || selected.includes('swelling'))) {
    return {
      condition: 'Possible Cardiac Issue',
      severity: 'high',
      recommendation: 'Symptoms suggest a potential cardiac condition. Immediate medical attention is strongly advised.',
      action: 'Book Emergency Doctor Visit',
    };
  }

  if (hasFever && hasRespiratory) {
    return {
      condition: 'Respiratory Infection',
      severity: 'medium',
      recommendation: 'Combination of fever and respiratory symptoms may indicate a viral or bacterial infection.',
      action: 'Book Doctor Consultation',
    };
  }

  if (hasNeurological && selected.length >= 3) {
    return {
      condition: 'Neurological Concern',
      severity: 'medium',
      recommendation: 'Multiple neurological symptoms detected. A specialist evaluation is recommended.',
      action: 'Book Neurologist Consultation',
    };
  }

  if (hasDiabetic && selected.length >= 2) {
    return {
      condition: 'Possible Metabolic / Diabetic Concern',
      severity: 'medium',
      recommendation: 'Symptoms may indicate blood sugar irregularities. A diabetes screening is recommended.',
      action: 'Book Diabetes Screening',
    };
  }

  if (selected.length === 0) {
    return {
      condition: 'No Symptoms Selected',
      severity: 'low',
      recommendation: 'Please select your symptoms to receive a health assessment.',
      action: 'Select Symptoms Above',
    };
  }

  if (selected.length <= 2) {
    return {
      condition: 'Mild Symptoms',
      severity: 'low',
      recommendation: 'Your symptoms appear mild. Rest, hydration, and monitoring are advised. Consult a doctor if symptoms persist.',
      action: 'Book General Consultation',
    };
  }

  return {
    condition: 'Multiple Symptoms Detected',
    severity: 'medium',
    recommendation: 'You have reported several symptoms. A comprehensive health evaluation is recommended.',
    action: 'Book Full Body Checkup',
  };
}

// ─── Sample Vitals Data ───────────────────────────────────────────────────────

const SAMPLE_VITALS: VitalReading[] = [
  { label: 'Blood Pressure', value: '128/84', unit: 'mmHg', status: 'caution', trend: 'up' },
  { label: 'Blood Sugar (Fasting)', value: '105', unit: 'mg/dL', status: 'normal', trend: 'stable' },
  { label: 'SpO2', value: '98', unit: '%', status: 'normal', trend: 'stable' },
  { label: 'Heart Rate', value: '76', unit: 'bpm', status: 'normal', trend: 'down' },
  { label: 'Weight', value: '72', unit: 'kg', status: 'normal', trend: 'stable' },
  { label: 'Temperature', value: '98.6', unit: '°F', status: 'normal', trend: 'stable' },
];

const HEALTH_TIPS = [
  { icon: '💧', tip: 'Drink at least 8 glasses of water daily to stay hydrated.' },
  { icon: '🏃', tip: 'Aim for 30 minutes of moderate exercise at least 5 days a week.' },
  { icon: '🥗', tip: 'Include more fruits, vegetables, and whole grains in your diet.' },
  { icon: '😴', tip: 'Get 7–9 hours of quality sleep every night for optimal health.' },
  { icon: '🧘', tip: 'Practice stress management techniques like meditation or deep breathing.' },
  { icon: '🩺', tip: 'Schedule regular health checkups even when you feel healthy.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function VitalCard({ vital }: { vital: VitalReading }) {
  const statusColors = {
    normal: 'text-green-600 bg-green-50 border-green-200',
    caution: 'text-amber-600 bg-amber-50 border-amber-200',
    high: 'text-red-600 bg-red-50 border-red-200',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    stable: '→',
  };

  return (
    <div className={`rounded-xl border p-4 ${statusColors[vital.status]}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium opacity-70">{vital.label}</span>
        <span className="text-xs font-bold">{trendIcons[vital.trend]}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">{vital.value}</span>
        <span className="text-xs opacity-70">{vital.unit}</span>
      </div>
      <Badge
        variant="outline"
        className={`mt-2 text-xs capitalize border-current ${
          vital.status === 'normal' ? 'text-green-700' :
          vital.status === 'caution' ? 'text-amber-700' : 'text-red-700'
        }`}
      >
        {vital.status}
      </Badge>
    </div>
  );
}

// ─── Symptom Checker Component (embedded, not a separate route) ───────────────

function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
    setAnalyzed(false);
    setResult(null);
  };

  const handleAnalyze = () => {
    const analysis = analyzeSymptoms(selectedSymptoms);
    setResult(analysis);
    setAnalyzed(true);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setResult(null);
    setAnalyzed(false);
  };

  const severityConfig = {
    low: { color: 'text-green-700 bg-green-50 border-green-300', icon: <CheckCircle className="w-5 h-5 text-green-600" />, label: 'Low Risk' },
    medium: { color: 'text-amber-700 bg-amber-50 border-amber-300', icon: <AlertTriangle className="w-5 h-5 text-amber-600" />, label: 'Moderate Risk' },
    high: { color: 'text-red-700 bg-red-50 border-red-300', icon: <AlertTriangle className="w-5 h-5 text-red-600" />, label: 'High Risk' },
  };

  const categories = [...new Set(SYMPTOMS.map(s => s.category))];

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Stethoscope className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-800">AI Symptom Checker</p>
            <p className="text-xs text-blue-600 mt-1">
              Select all symptoms you are currently experiencing. Our AI will analyze them and provide personalized health recommendations.
              <strong> This is not a substitute for professional medical advice.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Symptom Selection by Category */}
      {categories.map(category => (
        <div key={category}>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{category}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SYMPTOMS.filter(s => s.category === category).map(symptom => {
              const isSelected = selectedSymptoms.includes(symptom.id);
              return (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all text-sm font-medium ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-white bg-white' : 'border-gray-400'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-sm bg-blue-600" />}
                  </div>
                  {symptom.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Selected Count */}
      {selectedSymptoms.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span><strong>{selectedSymptoms.length}</strong> symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleAnalyze}
          disabled={selectedSymptoms.length === 0}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Brain className="w-4 h-4 mr-2" />
          Analyze Symptoms
        </Button>
        {analyzed && (
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* Result */}
      {result && analyzed && (
        <div className={`rounded-xl border-2 p-5 ${severityConfig[result.severity].color}`}>
          <div className="flex items-center gap-3 mb-3">
            {severityConfig[result.severity].icon}
            <div>
              <p className="font-bold text-base">{result.condition}</p>
              <Badge variant="outline" className="text-xs mt-1 border-current">
                {severityConfig[result.severity].label}
              </Badge>
            </div>
          </div>
          <p className="text-sm mb-4 leading-relaxed">{result.recommendation}</p>
          <Button
            className={`w-full ${
              result.severity === 'high'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : result.severity === 'medium'
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            onClick={() => window.location.href = '/booking'}
          >
            {result.action}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Health Risk Score ────────────────────────────────────────────────────────

function HealthRiskScore() {
  const score = 72;
  const getScoreColor = (s: number) => s >= 80 ? 'text-green-600' : s >= 60 ? 'text-amber-600' : 'text-red-600';
  const getScoreLabel = (s: number) => s >= 80 ? 'Good' : s >= 60 ? 'Fair' : 'Needs Attention';

  const factors = [
    { label: 'Cardiovascular Health', score: 78, status: 'normal' as const },
    { label: 'Metabolic Health', score: 65, status: 'caution' as const },
    { label: 'Respiratory Health', score: 85, status: 'normal' as const },
    { label: 'Mental Wellness', score: 70, status: 'normal' as const },
    { label: 'Nutritional Status', score: 60, status: 'caution' as const },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <p className="text-sm text-gray-500 mb-2">Overall Health Score</p>
        <div className={`text-6xl font-bold ${getScoreColor(score)}`}>{score}</div>
        <div className="text-sm font-medium text-gray-600 mt-1">out of 100</div>
        <Badge className={`mt-3 ${score >= 80 ? 'bg-green-100 text-green-700' : score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
          {getScoreLabel(score)}
        </Badge>
      </div>

      {/* Factor Breakdown */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-700">Health Factor Breakdown</h4>
        {factors.map(factor => (
          <div key={factor.label}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">{factor.label}</span>
              <span className={`text-sm font-bold ${getScoreColor(factor.score)}`}>{factor.score}%</span>
            </div>
            <Progress
              value={factor.score}
              className="h-2"
            />
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Improvement Areas
        </h4>
        <ul className="space-y-1 text-sm text-amber-700">
          <li>• Schedule a metabolic panel blood test</li>
          <li>• Increase dietary fiber and reduce processed foods</li>
          <li>• Consider a nutritionist consultation</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Main HealthPage Component ────────────────────────────────────────────────

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Digital Health Centre</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Monitor your health, check symptoms, and get personalized insights — all in one place.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="symptom-checker" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <TabsTrigger value="symptom-checker" className="rounded-lg text-xs sm:text-sm">
              <Brain className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Symptom </span>Checker
            </TabsTrigger>
            <TabsTrigger value="vitals" className="rounded-lg text-xs sm:text-sm">
              <Activity className="w-4 h-4 mr-1 sm:mr-2" />
              Vitals
            </TabsTrigger>
            <TabsTrigger value="risk-score" className="rounded-lg text-xs sm:text-sm">
              <Shield className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Risk </span>Score
            </TabsTrigger>
            <TabsTrigger value="tips" className="rounded-lg text-xs sm:text-sm">
              <Heart className="w-4 h-4 mr-1 sm:mr-2" />
              Tips
            </TabsTrigger>
          </TabsList>

          {/* Symptom Checker Tab — embedded component, no separate route */}
          <TabsContent value="symptom-checker">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Brain className="w-5 h-5 text-blue-600" />
                  AI Symptom Checker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SymptomChecker />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Health Vitals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {SAMPLE_VITALS.map(vital => (
                    <VitalCard key={vital.label} vital={vital} />
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-700">
                  <strong>Note:</strong> These are sample readings. Log in and connect your health devices to see your real-time vitals.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Score Tab */}
          <TabsContent value="risk-score">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Health Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HealthRiskScore />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Tips Tab */}
          <TabsContent value="tips">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Heart className="w-5 h-5 text-blue-600" />
                  Personalized Health Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {HEALTH_TIPS.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <span className="text-2xl">{tip.icon}</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{tip.tip}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.location.href = '/booking'}
                  >
                    Book a Health Consultation
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
