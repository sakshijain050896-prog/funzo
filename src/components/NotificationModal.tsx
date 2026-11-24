import React, { useState } from 'react';
import { X, Bell, Check, CheckCheck, Gift, Flame, Trophy, Sparkles, Megaphone, ArrowRight } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClaimReward: (id: string, coins: number) => void;
  onNavigateGame: (gameId?: string, category?: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClaimReward,
  onNavigateGame,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications = filter === 'unread'
    ? notifications.filter((n) => !n.isRead)
    : notifications;

  const getBadgeStyle = (type: AppNotification['type']) => {
    switch (type) {
      case 'reward':
        return 'bg-[#fef9c3] border-[#fef08a] text-[#854d0e] dark:bg-[#713f12]/30 dark:border-[#a16207]/40 dark:text-[#fde047]';
      case 'streak':
        return 'bg-[#ffedd5] border-[#fed7aa] text-[#c2410c] dark:bg-[#7c2d12]/30 dark:border-[#9a3412]/40 dark:text-[#fdba74]';
      case 'challenge':
        return 'bg-[#e0e7ff] border-[#c7d2fe] text-[#4338ca] dark:bg-[#312e81]/30 dark:border-[#4338ca]/40 dark:text-[#a5b4fc]';
      case 'update':
        return 'bg-[#dcfce7] border-[#bbf7d0] text-[#065f46] dark:bg-[#064e3b]/30 dark:border-[#047857]/40 dark:text-[#6ee7b7]';
      case 'system':
      default:
        return 'bg-[#f3e8ff] border-[#e9d5ff] text-[#7e22ce] dark:bg-[#581c87]/30 dark:border-[#7e22ce]/40 dark:text-[#d8b4fe]';
    }
  };

  const getIconElement = (type: AppNotification['type']) => {
    switch (type) {
      case 'reward':
        return <Gift className="w-4 h-4 text-amber-500" />;
      case 'streak':
        return <Flame className="w-4 h-4 text-orange-500" />;
      case 'challenge':
        return <Trophy className="w-4 h-4 text-indigo-500" />;
      case 'update':
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
      case 'system':
      default:
        return <Megaphone className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 animate-fade-in font-['Fredoka']">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#181d2f] border-4 border-slate-200 dark:border-black p-4 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#fee2e2] dark:bg-[#4c0519]/50 border-2 border-[#fecdd3] dark:border-[#9f1239] flex items-center justify-center text-rose-500 shadow-sm shrink-0">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-wide">
                  Notifications
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#f43f5e] text-white text-[10px] font-black">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Updates, daily gifts, and game challenges
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs & Mark All As Read */}
        <div className="flex items-center justify-between gap-2 py-3 border-b border-slate-100 dark:border-slate-800/80 shrink-0 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#121624] p-1 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                filter === 'all'
                  ? 'bg-white dark:bg-[#1f2639] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                filter === 'unread'
                  ? 'bg-white dark:bg-[#1f2639] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span>Unread</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
              )}
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-[11px] font-bold"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Notifications Scroll List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1 -mr-1">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-10 px-4">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-2xl">
                {filter === 'unread' ? '✨' : '📭'}
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                {filter === 'unread' ? 'All caught up!' : 'No notifications yet'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                {filter === 'unread'
                  ? 'You have read all your latest messages and rewards.'
                  : 'Check back soon for new challenges, daily rewards, and game announcements!'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const badgeStyle = getBadgeStyle(notif.type);

              return (
                <div
                  key={notif.id}
                  onClick={() => !notif.isRead && onMarkAsRead(notif.id)}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all text-left relative flex flex-col gap-2 ${
                    notif.isRead
                      ? 'bg-slate-50/70 dark:bg-[#141824]/60 border-slate-200 dark:border-slate-800/60 opacity-85'
                      : 'bg-white dark:bg-[#1c2236] border-slate-200 dark:border-slate-700 shadow-sm'
                  }`}
                >
                  {/* Top Bar inside card */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${badgeStyle}`}>
                        {getIconElement(notif.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                            {notif.title}
                          </h4>
                          {!notif.isRead && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" title="Unread" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                          {notif.time}
                        </span>
                      </div>
                    </div>

                    {!notif.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead(notif.id);
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition shrink-0"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Body text */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                    {notif.message}
                  </p>

                  {/* Actions (Claim reward / Play game) */}
                  {(notif.rewardCoins || notif.actionLabel) && (
                    <div className="flex items-center justify-end gap-2 pt-1 pl-9">
                      {notif.rewardCoins && (
                        notif.claimed ? (
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 py-1 px-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                            <Check className="w-3 h-3" /> Claimed
                          </span>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onClaimReward(notif.id, notif.rewardCoins!);
                            }}
                            className="flex items-center gap-1.5 py-1 px-3 rounded-xl bg-[#fef9c3] hover:bg-[#fef08a] border border-[#fef08a] text-[#854d0e] font-black text-xs shadow-xs active:scale-95 transition"
                          >
                            <Gift className="w-3.5 h-3.5" />
                            <span>Claim +{notif.rewardCoins} 🪙</span>
                          </button>
                        )
                      )}

                      {notif.actionLabel && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsRead(notif.id);
                            onNavigateGame(notif.actionGameId, notif.actionCategory);
                            onClose();
                          }}
                          className="flex items-center gap-1 py-1 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] dark:hover:bg-[#2a3248] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold text-xs active:scale-95 transition"
                        >
                          <span>{notif.actionLabel}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1f2639] dark:hover:bg-[#28324b] text-slate-700 dark:text-slate-300 font-bold text-xs transition active:scale-95"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
