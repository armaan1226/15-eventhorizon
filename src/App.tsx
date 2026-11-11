import { useState, useMemo, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  AlertTriangle,
  CheckCircle2,
  QrCode,
  Radio,
  Search,
  Filter,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
  Copy,
  Check,
  Award,
  Layers,
  Flame,
  Volume2,
  Send,
  Ticket
} from 'lucide-react';
import {
  FEST_EVENTS,
  VENUES_DATA,
  ARTISTS_DATA,
  BROADCAST_NOTICES,
  FestEvent,
  FestType,
  EventCategory,
  BroadcastNotice
} from './data/events';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  const [activeTab, setActiveTab] = useState<'timeline' | 'radar' | 'stars' | 'badge' | 'broadcast'>('timeline');

  // Filters
  const [selectedFest, setSelectedFest] = useState<string>('All');
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // My Personal Itinerary (Event IDs)
  const [myItinerary, setMyItinerary] = useState<string[]>(['ev-1', 'ev-2', 'ev-3']);
  const [copiedBadgeToken, setCopiedBadgeToken] = useState(false);
  const [passTier, setPassTier] = useState<'All-Access VIP Delegate' | 'General Student Pass' | 'Urja Athlete'>('All-Access VIP Delegate');

  // Broadcasts
  const [broadcastList, setBroadcastList] = useState<BroadcastNotice[]>(BROADCAST_NOTICES);
  const [newNoticeText, setNewNoticeText] = useState('');

  const toggleItinerary = (id: string) => {
    setMyItinerary(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Clash calculation within myItinerary
  const itineraryClashes = useMemo(() => {
    const list: { eventA: FestEvent; eventB: FestEvent; overlap: string }[] = [];
    const chosen = FEST_EVENTS.filter(e => myItinerary.includes(e.id));

    for (let i = 0; i < chosen.length; i++) {
      for (let j = i + 1; j < chosen.length; j++) {
        const evA = chosen[i];
        const evB = chosen[j];

        if (evA.day === evB.day) {
          // Check time overlap: [sA, eA] and [sB, eB]
          const startA = parseInt(evA.startTime.replace(':', ''));
          const endA = parseInt(evA.endTime.replace(':', ''));
          const startB = parseInt(evB.startTime.replace(':', ''));
          const endB = parseInt(evB.endTime.replace(':', ''));

          if (startA < endB && startB < endA) {
            list.push({
              eventA: evA,
              eventB: evB,
              overlap: `${evA.day} • ${evA.startTime} vs ${evB.startTime}`
            });
          }
        }
      }
    }
    return list;
  }, [myItinerary]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return FEST_EVENTS.filter(e => {
      const matchesFest = selectedFest === 'All' || e.fest === selectedFest;
      const matchesDay = selectedDay === 'All' || e.day === selectedDay;
      const matchesSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.organizingSociety.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.starPerformer && e.starPerformer.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFest && matchesDay && matchesSearch;
    });
  }, [selectedFest, selectedDay, searchQuery]);

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeText.trim()) return;

    const notice: BroadcastNotice = {
      id: `bc-${Date.now()}`,
      timestamp: 'Just now',
      author: 'Operations Command Duty Officer',
      urgency: 'Normal',
      message: newNoticeText,
    };

    setBroadcastList([notice, ...broadcastList]);
    setNewNoticeText('');
  };

  const copyBadgeToken = () => {
    navigator.clipboard.writeText(`TIET-PASS-SATURNALIA-2026:ROLL-102203491-TIER-VIP-SIGN:0xFA488E`);
    setCopiedBadgeToken(true);
    setTimeout(() => setCopiedBadgeToken(false), 2000);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-200`}>
      {/* Frosted Sticky Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-[#0f172a]/80 border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand & Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                    EventHorizon
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                    FEST MESH 5.0
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  TIET Saturnalia, Urja & Mudra Fest Operations Command
                </p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Center Tabs */}
          <nav className="flex items-center overflow-x-auto gap-1 p-1 bg-slate-100/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'timeline'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Fest Timeline
            </button>

            <button
              onClick={() => setActiveTab('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'radar'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Crowd Radar
              {itineraryClashes.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('stars')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'stars'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Headliners
            </button>

            <button
              onClick={() => setActiveTab('badge')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'badge'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              1-Tap Fest Pass
            </button>

            <button
              onClick={() => setActiveTab('broadcast')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'broadcast'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              Live Broadcasts
            </button>
          </nav>

          {/* Right Status */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono font-medium text-amber-700 dark:text-amber-300">
                SATURNALIA STAGE 1 LIVE
              </span>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Bento Grid KPI Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Attendees Checked-In */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total Checked-In Attendees
              </span>
              <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
                8,420
              </span>
              <span className="text-xs text-slate-400">students checked in</span>
            </div>
            <p className="mt-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              +1,240 entering during evening rush
            </p>
          </div>

          {/* Card 2: Stages Active */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Active Concurrent Stages
              </span>
              <span className="p-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                <Radio className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-orange-600 dark:text-orange-400">
                5 Venues
              </span>
              <span className="text-xs text-slate-400">live sound systems</span>
            </div>
            <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
              Athletic Track, OAT, Audi, Turf, COS
            </p>
          </div>

          {/* Card 3: Crowd Density Alert */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Crowd Density Warning
              </span>
              <span className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-rose-600 dark:text-rose-400">
                88.4%
              </span>
              <span className="text-xs text-slate-400">Athletic Grounds</span>
            </div>
            <p className="mt-2.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
              Gate 2 Redirection to North Gate 4
            </p>
          </div>

          {/* Card 4: Schedule Conflicts */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                My Itinerary Overlaps
              </span>
              <span className={`p-1.5 rounded-lg ${
                itineraryClashes.length > 0
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
              }`}>
                {itineraryClashes.length > 0 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
                {itineraryClashes.length}
              </span>
              <span className="text-xs text-slate-400">overlapping events</span>
            </div>
            <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
              {itineraryClashes.length > 0 ? 'Review in Crowd Radar tab' : 'No scheduling conflicts in your pass'}
            </p>
          </div>
        </div>

        {/* TAB 1: FEST TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, star artists (Seedhe Maut, Warikoo), venues, or societies..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                  <span className="text-slate-400">Fest:</span>
                  <select
                    value={selectedFest}
                    onChange={(e) => setSelectedFest(e.target.value)}
                    className="bg-transparent font-medium text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Fests</option>
                    <option value="Saturnalia">Saturnalia (Cultural)</option>
                    <option value="Urja Sports Fest">Urja (Sports)</option>
                    <option value="Mudra Dance Fest">Mudra (Dance)</option>
                    <option value="Thapar E-Summit">Thapar E-Summit</option>
                    <option value="Campus Food Gala">Food Gala</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                  <span className="text-slate-400">Day:</span>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="bg-transparent font-medium text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Days</option>
                    <option value="Day 1 (Friday)">Day 1 (Friday)</option>
                    <option value="Day 2 (Saturday)">Day 2 (Saturday)</option>
                    <option value="Day 3 (Sunday)">Day 3 (Sunday)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredEvents.map(event => {
                const isInItinerary = myItinerary.includes(event.id);
                const occupancyRatio = Math.round((event.currentAttendance / event.expectedAttendance) * 100);

                return (
                  <div
                    key={event.id}
                    className={`rounded-2xl border p-5 transition-all duration-200 space-y-4 ${
                      isInItinerary
                        ? 'bg-white dark:bg-slate-900 border-amber-500/60 shadow-md shadow-amber-500/5 ring-1 ring-amber-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            event.fest === 'Saturnalia'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                              : event.fest === 'Urja Sports Fest'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                          }`}>
                            {event.fest}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {event.day}
                          </span>
                        </div>
                        <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {event.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => toggleItinerary(event.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 shrink-0 ${
                          isInItinerary
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {isInItinerary ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Booked in Pass
                          </>
                        ) : (
                          'Add to Pass'
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {event.description}
                    </p>

                    {event.starPerformer && (
                      <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 text-xs flex items-center gap-2 text-amber-900 dark:text-amber-200">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                        <span><strong>Headliner:</strong> {event.starPerformer}</span>
                      </div>
                    )}

                    {/* Venue & Capacity Telemetry */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-2 text-xs font-mono">
                      <div className="flex justify-between items-center text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {event.venue}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Crowd Density</span>
                          <span>{event.currentAttendance} / {event.expectedAttendance} ({occupancyRatio}%)</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              occupancyRatio > 85 ? 'bg-rose-500' : occupancyRatio > 65 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, occupancyRatio)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Society: {event.organizingSociety.split(' ')[0]}</span>
                      <span>Access: {event.entryRule.split(' ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CROWD RADAR & CLASH DETECTOR */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            {/* Clash Alert Banner */}
            {itineraryClashes.length > 0 ? (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>{itineraryClashes.length} Itinerary Clash Detected in Your Fest Pass</span>
                </div>
                <div className="space-y-1.5 text-xs text-amber-900/80 dark:text-amber-200/80">
                  {itineraryClashes.map((clash, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                      <span>
                        <strong>{clash.eventA.title}</strong> clashes with <strong>{clash.eventB.title}</strong>
                      </span>
                      <span className="font-mono text-amber-600 font-bold">{clash.overlap}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>All events in your personal itinerary fit without overlapping time windows!</span>
              </div>
            )}

            {/* Campus Venues Telemetry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VENUES_DATA.map(venue => {
                const ratio = Math.round((venue.currentOccupancy / venue.maxCapacity) * 100);

                return (
                  <div
                    key={venue.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {venue.name}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">
                          Max Capacity: {venue.maxCapacity} people
                        </span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                        venue.status === 'Gate Redirection Active'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 animate-pulse'
                          : venue.status === 'Crowded'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }`}>
                        {ratio}% FULL
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          ratio >= 85 ? 'bg-rose-500' : ratio >= 70 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${ratio}%` }}
                      />
                    </div>

                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] font-mono">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Active Entry Gate</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{venue.activeGate}</span>
                      </div>
                      <div className="pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                        <span className="text-slate-400 block text-[10px] uppercase">Medical Station</span>
                        <span className="text-rose-600 dark:text-rose-400">{venue.medicalStation}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: STAR & SPEAKER SPOTLIGHT */}
        {activeTab === 'stars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ARTISTS_DATA.map(artist => (
              <div
                key={artist.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400">
                    {artist.fest} • {artist.role}
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                    {artist.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {artist.eventTitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {artist.bio}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stage Time:</span>
                    <span className="font-semibold">{artist.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Venue:</span>
                    <span className="font-semibold">{artist.venue}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{artist.riderStatus}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: 1-TAP QR FEST PASS */}
        {activeTab === 'badge' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-6 relative overflow-hidden">
              {/* Animated pulsating security watermark */}
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-white animate-pulse">
                  ● ANTI-SCREENSHOT LIVE SEC
                </span>
              </div>

              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 pb-4">
                <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  THAPAR INSTITUTE OFFICIAL FEST PASS
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  SATURNALIA & URJA 2026
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Valid for all campus venues, Star Night, OAT and Sports Arenas
                </p>
              </div>

              {/* Pass Tier Selector */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
                {(['All-Access VIP Delegate', 'General Student Pass', 'Urja Athlete'] as const).map(tier => (
                  <button
                    key={tier}
                    onClick={() => setPassTier(tier)}
                    className={`flex-1 py-1.5 rounded-lg transition ${
                      passTier === tier
                        ? 'bg-white dark:bg-slate-900 text-amber-600 font-bold shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tier.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Holographic Badge Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 text-white space-y-4 shadow-lg border border-slate-700/60">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                      {passTier}
                    </span>
                    <h4 className="text-xl font-bold mt-0.5">Armaan Singh</h4>
                    <p className="font-mono text-xs text-slate-400">Roll No: 102203491 (Hostel J)</p>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0">
                    <QrCode className="w-14 h-14 text-slate-900" />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/60 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase">Booked Events</span>
                    <p className="font-bold text-amber-400 mt-0.5">{myItinerary.length} Shows</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase">Star Night Access</span>
                    <p className="font-bold text-emerald-400 mt-0.5">Priority VIP</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase">Proctor Status</span>
                    <p className="font-bold text-teal-400 mt-0.5">Verified</p>
                  </div>
                </div>
              </div>

              <button
                onClick={copyBadgeToken}
                className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                {copiedBadgeToken ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied Digital Entry Barcode Token!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Cryptographic Turnstile Pass Token
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: LIVE BROADCAST DISPATCHER */}
        {activeTab === 'broadcast' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Radio className="w-5 h-5 text-amber-500" />
                  Live Fest Operations Dispatch Feed
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Official announcements sent by Proctor Office, Security, and Core Committees
                </p>
              </div>

              {/* Post Notice Form */}
              <form onSubmit={handlePostNotice} className="flex gap-2">
                <input
                  type="text"
                  value={newNoticeText}
                  onChange={(e) => setNewNoticeText(e.target.value)}
                  placeholder="Post security dispatch or venue redirect notice..."
                  className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Notice
                </button>
              </form>

              {/* Feed items */}
              <div className="space-y-3 pt-2">
                {broadcastList.map(notice => (
                  <div
                    key={notice.id}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 space-y-1.5 text-xs hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="font-bold text-amber-600 dark:text-amber-400">{notice.author}</span>
                      <span className="text-slate-400">{notice.timestamp}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {notice.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
