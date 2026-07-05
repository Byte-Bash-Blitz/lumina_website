import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { membersData } from './Members'

// Import members data and find member by ID
const getMemberData = (id) => {
  const member = membersData.find(m => m.id === id)
  
  if (!member) {
    // Return default data if member not found
    return {
      id: 'unknown',
      name: 'Unknown Member',
      imageName: 'kid.jpg',
      role: 'Member',
      bgColor: 'bg-gray-700',
      cardBg: 'bg-gray-800',
      borderColor: 'border-gray-500',
      roleColor: 'text-gray-400',
      bio: 'This member profile is currently being updated.',
      joinDate: 'Unknown',
      stats: {
        builds: 0,
        pvpWins: 0,
        hoursPlayed: 0,
        achievements: 0,
      },
    }
  }
  // Specific data for Vishal
  if (id === 'vishal') {
    return {
      ...member,
      bio: 'Vishal is an aspiring data engineer with a passion for AI and ML. As one of the Lumina Realm, he crafts powerful data pipelines, explores new technologies, and guides the clan through every digital adventure.',
      joinDate: 'November 2023',
      stats: {
        Projects: 20,
        Internships: 15,
        Courses: 25,
        CGPA: 8.5 ,
      },
      linkedin: 'https://www.linkedin.com/in/vishaln24/',
      github: 'https://github.com/Vishal-46',
      portfolio: 'https://vishal-46.github.io/Vishal-Portfolio/',
      terminal: 'https://terminal.bytebashblitz.org/profile/Vishal-46',
    }
  }

  // Specific data for Tony
  if (id === 'tony') {
    return {
      ...member,
      bio: 'Tony is a skilled web developer and cloud computing enthusiast. As one of the guardians of the Lumina Realm, he builds modern web applications, masters React and Supabase, and creates tools that strengthen the clan.',
      joinDate: 'Since 2022',
      stats: {
        Projects: 65,
        Internships: 38,
        Courses: 280,
        CGPA: 7.25 ,
      },
      linkedin: 'https://linkedin.com/in/infancetony',
      github: 'https://github.com/infance-tony',
      portfolio: 'https://infance-tony.github.io',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/infance-tony',
    }
  }

  // Specific data for Hamdhan
  if (id === 'hamdhan') {
    return {
      ...member,
      bio: 'Hamdhan is a passionate data scientist who uncovers hidden insights like discovering rare ores beneath the mountains. He specializes in machine learning and transforms raw data into valuable resources for the Lumina Realm.',
      joinDate: 'November 2023',
      stats: {
        Projects: 18,
        Internships: 15,
        Courses: 26,
        CGPA: 8.5 ,
      },
      linkedin: 'https://linkedin.com/in/hamdhan-hussain',
      github: 'https://github.com/Hamdhusam',
      portfolio: 'https://lovable.dev/projects/15278cb1-8afc-4b75-80b0-6271ef8114d2',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/Hamdhusam',
    }
  }

  // Specific data for Aparna
  if (id === 'aparna') {
    return {
      ...member,
      bio: 'Aparna is a talented web developer and UI/UX designer who crafts beautiful digital worlds block by block. She combines creativity and full-stack development to build immersive experiences across the Lumina Realm.',
      joinDate: 'August 2025',
      stats: {
        Projects: 26,
        Internships: 14,
        Courses: 10,
        CGPA: 8.75 ,
      },
      linkedin: 'https://www.linkedin.com/in/aparna-suresh-79276235a',
      github: 'https://github.com/Aparna-stack-ux782',
      portfolio: 'https://aparna-mindscape.lovable.app/',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/Aparna-stack-ux782',
    }
  }

  // Specific data for Nithisha
  if (id === 'nithisha') {
    return {
      ...member,
      bio: 'Nithisha is a dedicated data scientist who explores new biomes of data and develops innovative mobile applications. She specializes in image processing and secure systems that help the Lumina Realm thrive.',
      joinDate: 'August 2025',
      stats: {
        Projects: 10,
        Internships: 5,
        Courses: 10,
        CGPA: 8.41 ,
      },
      linkedin: 'https://www.linkedin.com/in/nithisha-p-n-362067332',
      github: 'https://github.com/nithishanagarani',
      portfolio: 'https://lovable.dev/projects/b892721e-ffec-4195-85d4-3878067cd541',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/nithishanagarani',
    }
  }

  // Specific data for Falin
  if (id === 'falin') {
    return {
      ...member,
      bio: 'Falin is a versatile web developer and UI/UX designer who builds creative digital structures with full-stack technologies. From Python to React, he strengthens the Lumina Realm with every project he creates.',
      joinDate: 'November 2023',
      stats: {
        Projects: 15,
        Internships: 30,
        Courses: 25,
        CGPA: 9.25 ,
      },
      linkedin: 'https://www.linkedin.com/in/sandofalin',
      github: 'https://github.com/Falin-dev',
      portfolio: 'https://instagram.com/encode_falin.py',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/Falin-dev',
    }
  }

  // Specific data for Jenish
  if (id === 'jenish') {
    return {
      ...member,
      bio: 'Jenish is a creative web developer and UI/UX designer who enjoys building modern digital worlds. His skills in Python, JavaScript, and React help expand the Lumina Realm one block at a time.',
      joinDate: 'November 2023',
      stats: {
        Projects: 9,
        Internships: 8,
        Courses: 17,
        CGPA: 7.8 ,
      },
      linkedin: 'https://www.linkedin.com/in/jenish-s-4aa3692b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/jenish-prog',
      portfolio: 'https://instagram.com/jen_is_h_',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/jenish-prog',
    }
  }

  // Specific data for Abin
  if (id === 'abin') {
    return {
      ...member,
      bio: 'Abin is a web developer who enjoys building efficient digital creations with Python, JavaScript, and React. Every project adds another strong block to the growing Lumina Realm.',
      joinDate: 'November 2023',
      stats: {
        Projects: 5,
        Internships: 3,
        Courses: 7,
        CGPA: 7.5 ,
      },
      linkedin: 'https://www.linkedin.com/in/abin-i',
      github: 'https://github.com/Abin-I',
      portfolio:'https://instagram.com/abin_i',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/abin-i',
    }
  }

  // Specific data for Akshaya
  if (id === 'akshaya') {
    return {
      ...member,
      bio: 'Akshaya is a passionate web developer and UI/UX designer who brings creativity and precision to every build. Her projects help shape the Lumina Realm into an even better place for adventurers.',
      joinDate: 'August 2025',
      stats: {
        Projects: 10,
        Internships: 5,
        Courses: 5,
        CGPA: 8.39 ,
      },
      linkedin: 'https://www.linkedin.com/in/akshaya-libin-sibcy-l-155a04333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/akshaya-1806',
      portfolio: 'https://instagram.com/lepidora__',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/akshaya-1806',
    }
  }

  // Specific data for Arshiya
  if (id === 'arshiya') {
    return {
      ...member,
      bio: 'Arshiya is a data analyst who explores vast biomes of information and turns complex datasets into easy-to-read maps. She specializes in uncovering valuable insights that guide the Lumina Realm toward smarter decisions.',
      joinDate: 'April 2026',
      stats: {
        Projects: 4,
        Internships: 1,
        Courses: 2,
        CGPA: 9.14 ,
      },
      linkedin: 'https://www.linkedin.com/in/mohamed-arshiya-n-9a303a3aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/mohamedarshiya-n',
      portfolio: 'https://instagram.com/_mohamed.arshiya_',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/mohamedarshiya-n',
    }
  }

  // Specific data for Ajisha
  if (id === 'ajisha') {
    return {
      ...member,
      bio: 'Ajisha is a web developer and UI/UX designer who enjoys crafting smooth digital experiences. Using Python, JavaScript, and React, she helps build creative projects across the Lumina Realm.',
      joinDate: 'November 2023',
      stats: {
        Projects: 16,
        Internships: 10,
        Courses: 15,
        CGPA: 8.83 ,
      },
      linkedin: 'https://www.linkedin.com/in/ajisha-vishnu',
      github: 'https://github.com/ajisha-vishnu',
      portfolio: 'https://instagram.com/__.ajisha__',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/ajisha-v',
    }
  }
  
  // Specific data for Jeni
  if (id === 'jeni') {
    return {
      ...member,
      bio: 'Jeni is a cloud engineer who designs, builds, and manages scalable cloud infrastructure to drive digital transformation. She specializes in automating deployments, optimizing cloud spend, and ensuring high availability for critical business applications.',
      joinDate: 'April 2026',
      stats: {
        Projects: 5,
        Internships: 3,
        Courses: 2,
        CGPA: 8.18 ,
      },
      linkedin: 'https://www.linkedin.com/in/jenimelbina-s',
      github: 'https://github.com/jenimelbina-S',
      portfolio: 'https://sportsdot.in',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/jenimelbina-S',
    }
  }

  
  // Specific data for Aysha
  if (id === 'aysha') {
    return {
      ...member,
      bio: 'Aysha is a cloud engineer who designs, builds, and manages floating sky bases and massive multi-level structures way up at the build limit. She specializes in automating Elytra launching pads, optimizing render distance lag, and keeping critical community farms floating safely above the void.',
      joinDate: 'April 2026',
      stats: {
        Projects: 6,
        Internships: 1,
        Courses: 2,
        CGPA: 8.0 ,
      },
      linkedin: 'https://terminal.bytebashblitz.org/profilev3/Ayisha%20Syed%20Ali',
      github: 'https://github.com/ayishahidha16-cmyk',
      portfolio:'https://instagram.com/_aysha_ayz',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/ayishahidha16-cmyk',
    }
  }

  // Specific data for Linciya
  if (id === 'linciya') {
    return {
      ...member,
      bio: 'Linciya is a data scientist who deciphers the cryptic Galactic Alphabet of the Enchanting Table to predict exact combat outcomes and potion brewing curves. She specializes in calculating critical-hit probabilities, tracking mob spawning algorithms, and mapping out structural coordinates using pure mathematics.',
      joinDate: 'April 2026',
      stats: {
        Projects: 6,
        Internships: 0,
        Courses: 5,
        CGPA: 8.86 ,
      },
      linkedin: 'https://www.linkedin.com/in/linciya-sebastian-619a493a9?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/linciya-s',
      portfolio: 'https://instagram.com/Ziyaah_xz',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/linciya-s',
    }
  }
    // Specific data for Tharun
  if (id === 'tharun') {
    return {
      ...member,
      bio: 'Tharun is a cyber security engineer who fortifies faction bases, traps Nether portals, and defends servers against griefers and unauthorized raids. He specializes in designing un-minable bedrock shells, anti-Xray precautions, and zero-trust pressure plate verification systems to protect the team’s diamonds',
      joinDate: 'April 2026',
      stats: {
        Projects: 10,
        Internships: 1,
        Courses: 15,
        CGPA: 7.7 ,
      },
      linkedin: 'https://www.linkedin.com/in/tharun-krishna-347b123a0?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/tharunkrishna107-ship-it',
      portfolio: 'https://instagram.com/krish._.x__',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/tharunkrishna107-ship-it',
    }
  }
    // Specific data for Naveen
  if (id === 'naveen') {
    return {
      ...member,
      bio: 'Naveen is a data engineer who designs, builds, and maintains massive Redstone sorting systems and hopper pipelines to process chests full of raw materials. He specializes in automating resource collection, building lag-free mob grinders, and ensuring clean, organized storage rooms for the entire server.',
      joinDate: 'April 2026',
      stats: {
        Projects: 10,
        Internships: 20,
        Courses: 10,
        CGPA: 8.5 ,
      },
      linkedin: 'https://www.linkedin.com/in/naveen-m-354887375',
      github: 'https://github.com/nrnnaveen',
      portfolio: 'https://instagram.com/nrn_naveen_96',
      terminal: 'https://terminal.bytebashblitz.org/profilev3/nrnnaveen',
    }
  }

}

const MemberProfile = () => {
  const { id } = useParams()
  const member = getMemberData(id)

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: member.linkedin },
    { name: 'GitHub', icon: '💻', url: member.github },
    { name: 'Portfolio', icon: '🌐', url: member.portfolio },
    { name: 'Terminal', icon: '⌨️', url: member.terminal },
  ]

  return (
    <section className="min-h-screen py-20 bg-minecraft-darker relative overflow-hidden">
      {/* Dark wooden board texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-800/20 to-stone-900/30 mix-blend-multiply"></div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a8a29e' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 60L60 0H0v60zM60 60V0l-60 60h60z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }}></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Link 
          to="/members"
          className="inline-flex items-center text-minecraft-green hover:text-green-400 mb-6 text-sm font-bold bg-minecraft-dark border-2 border-black/50 px-3 py-2 shadow-lg bounty-button"
        >
          <span className="mr-2">←</span> Back to Crew
        </Link>

        {/* Profile Container - Clean Bounty Style */}
        <div className="bg-minecraft-dark border-4 border-minecraft-green overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8">
            {/* Left Column - Avatar and Basic Info */}
            <div className="md:col-span-1">
              {/* Avatar - Full display */}
              <div className={`aspect-[3/4] border-4 ${member.borderColor} mb-6 overflow-hidden bg-black/40 relative`}>
                <img 
                  src={`/Avatar_Bounty/${member.imageName}`}
                  alt={member.name}
                  className="w-full h-full object-contain"
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

              {/* Role Badge */}
              <div className={`bg-minecraft-green text-black text-center py-3 px-4 font-bold text-sm mb-4 border-2 border-black/50`}>
                {member.role}
                {member.type === 'captain' && (
                  <div className="text-xs mt-1">👑 CLAN LEADER 👑</div>
                )}
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                <div className="text-minecraft-green font-bold text-sm mb-2 minecraft-shadow">Contact Info:</div>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-minecraft-dark hover:bg-black/60 p-3 border-2 border-minecraft-green transition-all shadow-md"
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-white text-sm font-bold">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Name and Role */}
              <div className="text-center border-b-4 border-minecraft-green pb-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 minecraft-shadow">
                  {member.name.toUpperCase()}
                </h1>
                <p className={`text-lg font-bold ${member.roleColor} minecraft-shadow`}>
                  {member.role}
                </p>
                {member.type === 'captain' && (
                  <div className="inline-block bg-red-700 text-white px-4 py-2 mt-2 border-2 border-red-900 shadow-lg">
                    <p className="text-sm font-bold minecraft-shadow">
                    👑 CLAN LEADER 👑
                    </p>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="bg-minecraft-dark border-4 border-minecraft-green p-4">
                <h2 className="text-xl font-bold text-minecraft-green mb-3 minecraft-shadow border-b-2 border-minecraft-green pb-1">
                  🏰 Realm History
                </h2>
                <p className="text-minecraft-gray text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Join Date */}
              <div className="bg-minecraft-dark border-4 border-minecraft-green p-4">
                <h2 className="text-xl font-bold text-minecraft-green mb-3 minecraft-shadow border-b-2 border-minecraft-green pb-1">
                  ⚒️ Mining Since
                </h2>
                <p className="text-white text-sm font-bold">
                  {member.joinDate || 'Recent Recruit'}
                </p>
              </div>

              {/* Stats */}
              <div className="bg-minecraft-dark border-4 border-minecraft-green p-4">
                <h2 className="text-xl font-bold text-minecraft-green mb-4 minecraft-shadow border-b-2 border-minecraft-green pb-1">
                  ⚒️ Adventure Stats
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 border-2 border-minecraft-green text-center">
                    <div className="text-2xl font-bold text-minecraft-green minecraft-shadow">
                      {member.stats?.Projects || 0}
                    </div>
                    <div className="text-minecraft-gray text-xs font-bold">
                      BUILDS COMPLETED
                    </div>
                  </div>

                  <div className="bg-black/30 p-4 border-2 border-minecraft-green text-center">
                    <div className="text-2xl font-bold text-minecraft-green minecraft-shadow">
                      {member.stats?.Internships || 0}
                    </div>
                    <div className="text-minecraft-gray text-xs font-bold">
                      QUESTS COMPLETED
                    </div>
                  </div>

                  <div className="bg-black/30 p-4 border-2 border-minecraft-green text-center">
                    <div className="text-2xl font-bold text-minecraft-green minecraft-shadow">
                      {member.stats?.Courses || 0}
                    </div>
                    <div className="text-minecraft-gray text-xs font-bold">
                      SKILLS MASTERED
                    </div>
                  </div>

                  <div className="bg-black/30 p-4 border-2 border-minecraft-green text-center">
                    <div className="text-2xl font-bold text-minecraft-green minecraft-shadow">
                      {member.stats?.CGPA || 0}
                    </div>
                    <div className="text-minecraft-gray text-xs font-bold">
                      EXPERIENCE LEVEL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MemberProfile
