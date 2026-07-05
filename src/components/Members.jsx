import React from 'react'
import { Link } from 'react-router-dom'

export const membersData = [
  // Captains
  {
    id: 'akshaya',
    name: 'Akshaya',
    imageName: 'Akshaya.webp',
    type: 'captain',
    bounty: '999,999,999',
    bgColor: 'bg-gradient-to-br from-yellow-900/80 to-amber-900/80',
    cardBg: 'bg-gradient-to-br from-yellow-800/70 to-orange-800/70',
    borderColor: 'border-orange-500',
    roleColor: 'text-orange-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'aparna',
    name: 'Aparna',
    imageName: 'Aparna.webp',
    type: 'captain',
    bounty: '999,999,000',
    bgColor: 'bg-gradient-to-br from-orange-900/90 to-amber-900/90',
    cardBg: 'bg-gradient-to-br from-orange-800/80 to-amber-800/80',
    borderColor: 'border-orange-600',
    roleColor: 'text-orange-300',
    textColor: 'text-orange-200',
  },
  
  // Regular members
  {
    id: 'abin',
    name: 'Abin',
    imageName: 'Abin.webp',
    type: 'member',
    bounty: '320,000,000',
    bgColor: 'bg-gradient-to-br from-yellow-900/80 to-amber-900/80',
    cardBg: 'bg-gradient-to-br from-yellow-800/70 to-orange-800/70',
    borderColor: 'border-yellow-600',
    roleColor: 'text-yellow-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'vishal',
    name: 'Vishal',
    imageName: 'Vishal.webp',
    type: 'member',
    bounty: '1,000,000,000',
    bgColor: 'bg-gradient-to-br from-amber-900/90 to-yellow-900/90',
    cardBg: 'bg-gradient-to-br from-amber-800/80 to-yellow-800/80',
    borderColor: 'border-amber-600',
    roleColor: 'text-amber-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'ajisha',
    name: 'Ajisha',
    imageName: 'Ajisha.webp',
    type: 'member',
    bounty: '950,000,000',
    bgColor: 'bg-gradient-to-br from-orange-900/90 to-amber-900/90',
    cardBg: 'bg-gradient-to-br from-orange-800/80 to-amber-800/80',
    borderColor: 'border-orange-600',
    roleColor: 'text-orange-300',
    textColor: 'text-orange-200',
  },
  {
    id: 'falin',
    name: 'Falin',
    imageName: 'Falin.webp',
    type: 'member',
    bounty: '550,000,000',
    bgColor: 'bg-gradient-to-br from-yellow-900/80 to-amber-900/80',
    cardBg: 'bg-gradient-to-br from-yellow-800/70 to-orange-800/70',
    borderColor: 'border-yellow-500',
    roleColor: 'text-yellow-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'hamdhan',
    name: 'Hamdhan',
    imageName: 'Hamdhan.webp',
    type: 'member',
    bounty: '810,000,000',
    bgColor: 'bg-gradient-to-br from-orange-900/90 to-amber-900/90',
    cardBg: 'bg-gradient-to-br from-orange-800/80 to-amber-800/80',
    borderColor: 'border-orange-600',
    roleColor: 'text-orange-300',
    textColor: 'text-orange-200',
  },
  {
    id: 'jenish',
    name: 'Jenish',
    imageName: 'Jenish.webp',
    type: 'member',
    bounty: '670,000,000',
    bgColor: 'bg-gradient-to-br from-yellow-900/80 to-amber-900/80',
    cardBg: 'bg-gradient-to-br from-yellow-800/70 to-orange-800/70',
    borderColor: 'border-gray-500',
    roleColor: 'text-gray-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'nithisha',
    name: 'Nithisha',
    imageName: 'Nithisha.webp',
    type: 'member',
    bounty: '490,000,000',
    bgColor: 'bg-gradient-to-br from-orange-900/90 to-amber-900/90',
    cardBg: 'bg-gradient-to-br from-orange-800/80 to-amber-800/80',
    borderColor: 'border-orange-600',
    roleColor: 'text-orange-300',
    textColor: 'text-orange-200',

  },
  {
    id: 'tony',
    name: 'Tony',
    imageName: 'Tony.webp',
    type: 'member',
    bounty: '330,000,000',
    bgColor: 'bg-gradient-to-br from-yellow-900/80 to-amber-900/80',
    cardBg: 'bg-gradient-to-br from-yellow-800/70 to-orange-800/70',
    borderColor: 'border-green-500',
    roleColor: 'text-green-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'naveen',
    name: 'Naveen',
    imageName: 'naveen.webp',
    type: 'member',
    bounty: '950,000,000',
    bgColor: 'bg-gradient-to-br from-amber-900/90 to-yellow-900/90',
    cardBg: 'bg-gradient-to-br from-amber-800/80 to-yellow-800/80',
    borderColor: 'border-amber-600',
    roleColor: 'text-amber-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'tharun',
    name: 'Tharun Krishna',
    imageName: 'tharun.webp',
    type: 'member',
    bounty: '800,000,000',
    bgColor: 'bg-gradient-to-br from-yellow-900/80 to-amber-900/80',
    cardBg: 'bg-gradient-to-br from-yellow-800/70 to-orange-800/70',
    borderColor: 'border-yellow-500',
    roleColor: 'text-yellow-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'linciya',
    name: 'Linciya',
    imageName: 'linciya.webp',
    type: 'member',
    bounty: '850,000,000',
    bgColor: 'bg-gradient-to-br from-orange-900/90 to-amber-900/90',
    cardBg: 'bg-gradient-to-br from-orange-800/80 to-amber-800/80',
    borderColor: 'border-orange-600',
    roleColor: 'text-orange-300',
    textColor: 'text-orange-200',
  },
  {
    id: 'arshiya',
    name: 'Mohammed Arshiya',
    imageName: 'arshiya.webp',
    type: 'member',
    bounty: '700,000,000',
    bgColor: 'bg-gradient-to-br from-yellow-900/80 to-amber-900/80',
    cardBg: 'bg-gradient-to-br from-yellow-800/70 to-orange-800/70',
    borderColor: 'border-yellow-500',
    roleColor: 'text-yellow-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'jeni',
    name: 'Jeni Melbina',
    imageName: 'jeni.webp',
    type: 'member',
    bounty: '150,000,000',
    bgColor: 'bg-gradient-to-br from-yellow-900/80 to-amber-900/80',
    cardBg: 'bg-gradient-to-br from-yellow-800/70 to-orange-800/70',
    borderColor: 'border-yellow-500',
    roleColor: 'text-yellow-300',
    textColor: 'text-amber-200',
  },
  {
    id: 'aysha',
    name: 'Aysha',
    imageName: 'aysha.webp',
    type: 'member',
    bounty: '100,000,000',
    bgColor: 'bg-gradient-to-br from-orange-900/90 to-amber-900/90',
    cardBg: 'bg-gradient-to-br from-orange-800/80 to-amber-800/80',
    borderColor: 'border-orange-600',
    roleColor: 'text-orange-300',
    textColor: 'text-orange-200',
  },
]

const Members = () => {
  // Avatar component using local images from Avatar_Bounty folder
  const MemberAvatar = ({ imageName, name, isHoverable = false, aspectRatio = "square" }) => {
    const avatarUrl = `/Avatar_Bounty/${imageName}`
    
    return (
      <div className={`w-full h-full flex items-center justify-center overflow-hidden ${isHoverable ? 'transition-all duration-300 hover:scale-105' : ''}`}>
        <img 
          src={avatarUrl}
          alt={`${name}'s Avatar`}
          className={`w-full h-full ${aspectRatio === 'square' ? 'object-contain' : 'object-cover'}`}
          style={{ 
            imageRendering: 'crisp-edges',
            WebkitImageRendering: 'crisp-edges',
            msImageRendering: 'crisp-edges'
          }}
          onError={(e) => {
            e.target.src = '/Avatar_Bounty/kid.jpg'
          }}
        />
      </div>
    )
  }

  // Captains - Top tier leadership (Vishal and Ajisha)
  const captains = membersData.filter(member => member.type === 'captain')

  // Regular members - Skilled warriors
  const clanMembers = membersData.filter(member => member.type === 'member')

  return (
    <section className="min-h-screen py-20 bg-minecraft-darker relative overflow-hidden">
      {/* Dark wooden board texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-800/20 to-stone-900/30 mix-blend-multiply"></div>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a8a29e' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 60L60 0H0v60zM60 60V0l-60 60h60z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 minecraft-shadow">
            LUMINA REALM
          </h1>

          <div className="text-minecraft-green text-sm font-bold">
            ⛏️ MINECRAFT CLAN ⛏️
          </div>

          <p className="text-minecraft-gray text-base max-w-2xl mx-auto leading-relaxed mt-6 font-semibold">
            Meet the legendary adventurers who build, explore, conquer, and
            protect the realm together.
          </p>
        </div>

        {/* Clan Leaders Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {captains.map((captain) => (
              <div key={captain.id} className="text-center">
                <Link
                  to={`/member/${captain.id}`}
                  className="block relative group"
                >
                  <div
                    className={`aspect-[3/4] ${captain.bgColor} overflow-hidden shadow-2xl border-6 ${captain.borderColor} hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 bounty-paper-dark relative`}
                  >
                    {/* Avatar - Full area */}
                    <div className="absolute inset-2">
                      <MemberAvatar
                        imageName={captain.imageName}
                        name={captain.name}
                        isHoverable={true}
                        aspectRatio="portrait"
                      />
                    </div>

                    {/* Clan Leader Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-green-700 text-amber-200 px-3 py-2 shadow-lg border-2 border-green-900 transform rotate-12">
                        <span className="text-xs font-bold">
                          👑 CLAN LEADER 👑
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="mt-4">
                  <h3
                    className={`${captain.textColor} text-xl font-bold bounty-subtitle minecraft-shadow`}
                  >
                    {captain.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clan Members Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white minecraft-shadow">
              ⛏️ CLAN MEMBERS ⛏️
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {clanMembers.map((member) => (
              <div key={member.id} className="text-center">
                <Link
                  to={`/member/${member.id}`}
                  className="block group"
                >
                  <div
                    className={`aspect-[4/5] ${member.bgColor} overflow-hidden shadow-xl border-4 ${member.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bounty-paper-dark relative`}
                  >
                    {/* Avatar - Full area */}
                    <div className="absolute inset-1">
                      <MemberAvatar
                        imageName={member.imageName}
                        name={member.name}
                        isHoverable={true}
                        aspectRatio="portrait"
                      />
                    </div>
                  </div>
                </Link>

                <div className="mt-3">
                  <h3
                    className={`${member.textColor} text-sm font-bold bounty-subtitle minecraft-shadow`}
                  >
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Members
